const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const delay = parseInt(form.elements.delay.value, 10);
  const step = parseInt(form.elements.step.value, 10);
  const amount = parseInt(form.elements.amount.value, 10);

  handlePromises(amount, step, delay);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handlePromises(amount, step, delay) {
  let currentDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += step;
  }
}
