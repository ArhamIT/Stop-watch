// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    let startTime, updatedTime, difference, timer;
    let running = false;

    function start() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            timer = setInterval(updateDisplay, 1000 / 60);
            running = true;
            display.classList.add('glow');
        }
    }

    function stop() {
        if (running) {
            clearInterval(timer);
            difference = new Date().getTime() - startTime;
            running = false;
            display.classList.remove('glow');
        }
    }

    function reset() {
        clearInterval(timer);
        running = false;
        startTime = null;
        updatedTime = null;
        difference = null;
        display.textContent = '00:00:00';
        display.classList.remove('glow');
    }

    function updateDisplay() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    resetButton.addEventListener('click', reset);
});
