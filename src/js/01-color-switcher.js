const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
let isChangingTheme = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

startBtn.addEventListener("click", () => {
    if (isChangingTheme) {
        return; 
      }
      isChangingTheme = true;
      startBtn.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  if (isChangingTheme) {
    clearInterval(timerId);
    isChangingTheme = false;
    startBtn.disabled = false;
  console.log(`Interval with id ${timerId} has stopped!`);
}
});
console.log()