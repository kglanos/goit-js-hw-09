function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const body = document.body;
let IntervalId = null;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    IntervalId = setInterval(() => {
        const randomColor  = getRandomHexColor();
        body.style.background = randomColor;
    }, 1000);
});

stopButton.addEventListener('click', () =>{
    clearInterval(IntervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
});
