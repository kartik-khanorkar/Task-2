let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(updateDisplay, 1000);
        document.getElementById('startStopBtn').textContent = 'Stop';
        document.getElementById('lapBtn').textContent = 'Lap';
    } else {
        clearInterval(timer);
        document.getElementById('startStopBtn').textContent = 'Resume';
        document.getElementById('lapBtn').textContent = 'Reset Laps';
    }
    isRunning = !isRunning;
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(hours, minutes, seconds);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('lapList').appendChild(lapItem);
        lapCounter++;
    } else {
        resetLaps();
    }
}

function resetLaps() {
    lapCounter = 1;
    document.getElementById('lapList').innerHTML = '';
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    updateDisplay();
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('lapBtn').textContent = 'Lap';
    resetLaps();
}

function updateDisplay() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    const formattedTime = formatTime(hours, minutes, seconds);
    document.querySelector('.display').textContent = formattedTime;
}

function formatTime(hours, minutes, seconds) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

document.getElementById('startStopBtn').addEventListener('click', startStopwatch);
document.getElementById('lapBtn').addEventListener('click', lap);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
