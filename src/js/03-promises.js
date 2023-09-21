import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelayElement = document.querySelector('[name="delay"]');
const inputStepElement = document.querySelector('[name="step"]');
const inputAmountElement = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  let delay = Number(inputDelayElement.value);
  let step = Number(inputStepElement.value);
  let amount = Number(inputAmountElement.value);
  let position = 0;
  delay = delay - step;
  form.reset();
  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
