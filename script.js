let intervalId;
const alarms = [];

function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const currentTime = `${twelveHourFormat}:${minutes}:${seconds} ${ampm}`;
    const currentDate = `Fecha: ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    timeElement.textContent = currentTime;
    dateElement.textContent = currentDate;
}

function setAlarm() {
    const alarmNameInput = document.getElementById('alarm-name');
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmAmpmInput = document.getElementById('alarm-ampm');
    const alarmName = alarmNameInput.value.trim();
    const alarmTime = alarmTimeInput.value;
    const ampm = alarmAmpmInput.value;

    if (!alarmName || !alarmTime) {
        alert('Por favor, ingresa un nombre y selecciona una hora para configurar la alarma.');
        return;
    }

    clearInterval(intervalId);

    const alarm = {
        name: alarmName,
        time: convertTo12HourFormat(alarmTime, ampm),
    };

    alarms.push(alarm);
    updateAlarmList();

    intervalId = setInterval(() => {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const [selectedHours, selectedMinutes] = alarm.time.split(':').map(Number);

        if (ampm === 'PM' && currentHours < 12) {
            selectedHours += 12;
        }

        if (ampm === 'AM' && currentHours === 12) {
            selectedHours -= 12;
        }

        if (currentHours === selectedHours && currentMinutes === selectedMinutes) {
            clearInterval(intervalId);
            alert(`¡Es hora de la alarma "${alarmName}"!`);
        }
    }, 1000);

    alert(`Alarma "${alarmName}" configurada para las ${alarm.time}.`);
    alarmNameInput.value = '';
    alarmTimeInput.value = '';
}

function updateAlarmList() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';

    alarms.forEach(alarm => {
        const listItem = document.createElement('li');
        listItem.textContent = `${alarm.name}: ${alarm.time}`;
        alarmList.appendChild(listItem);
    });
}

function convertTo12HourFormat(time, ampm) {
    const [hours, minutes] = time.split(':').map(Number);

    if (ampm === 'PM' && hours < 12) {
        hours += 12;
    }

    if (ampm === 'AM' && hours === 12) {
        hours -= 12;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

document.getElementById('set-alarm').addEventListener('click', setAlarm);

updateTime();
setInterval(updateTime, 1000);
