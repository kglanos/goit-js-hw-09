import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateCounter(targetDate) {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference < 0) {
        alert("Please choose a date in the future");
        return;
    }

    if (timeDifference === 0) {
        clearInterval(intervalId);
        alert("Countdown timer reached zero!");
        return;
    }

    const time = convertMs(timeDifference);

    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    daysElement.textContent = addLeadingZero(time.days);
    hoursElement.textContent = addLeadingZero(time.hours);
    minutesElement.textContent = addLeadingZero(time.minutes);
    secondsElement.textContent = addLeadingZero(time.seconds);

    options.destroy();
}

let intervalId;

const options = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
        const targetDate = selectedDates[0];
        const currentDate = new Date();

        if (targetDate < currentDate) {
            alert("Please choose a date in the future");
            document.document.querySelector('[data-start]').disabled = true;
        } else {
            document.document.querySelector('[data-start]').disabled = false;
        }
    },
    onChange: function (selectedDates) {
            clearInterval(intervalId);
        const targetDate = selectedDates[0];

        const startButton = document.querySelector('[data-start]');
        startButton.disabled = false;
        startButton.addEventListener('click', function () {
            updateCounter(targetDate);
            intervalId = setInterval(function () {
                updateCounter(targetDate);
                }, 1000);
            this.disabled = true;
        });
    },
});

document.querySelector('[data-start]').disabled = true;