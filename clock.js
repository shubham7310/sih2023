function updateClock(hour, minute) {
    const hourDeg = (hour % 12) * 30 + (minute / 2);
    const minuteDeg = minute * 6;

    const hourHand = document.getElementById("hour-hand");
    const minuteHand = document.getElementById("minute-hand");

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
}

document.getElementById("set-time-button").addEventListener("click", () => {
    const hourInput = document.getElementById("hour");
    const minuteInput = document.getElementById("minute");
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);

    if (!isNaN(hour) && !isNaN(minute)) {
        updateClock(hour, minute);
    }
});
