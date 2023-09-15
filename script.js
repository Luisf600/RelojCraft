function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    let hours = now.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    
    // Convertir a formato de 12 horas
    hours = hours % 12 || 12;

    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    timeElement.textContent = currentTime;
}

// Actualizar el reloj cada segundo (1000 ms)
setInterval(updateTime, 1000);

// Actualizar el reloj cuando se carga la página
updateTime();