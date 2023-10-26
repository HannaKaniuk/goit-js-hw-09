import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
  inputText: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

class Clockface {
  initTime;
  intervalId;
  isActive = false;

  constructor(render) {
    this.render = render;
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.initTime = new Date(refs.inputText.value).getTime();
    const currentTime = Date.now();
    if (this.initTime > currentTime) { 
      console.log('start');
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = this.initTime - currentTime;
        const time = convertMs(diff);
        this.render(time);
        if (diff <= 0) { 
          this.stop();
        }
      }, 1000);
    }
  }

  stop() {
    if (!this.isActive) return;
    console.log('stop');
    this.isActive = false;
    clearInterval(this.intervalId);
  }
}

const clockface = new Clockface(render);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      const currentTime = new Date();
      if (selectedDate <= currentTime) {
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
      } else {
        refs.startBtn.disabled = false;
      }
    }
  },
};

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', () => {
  clockface.start();
});

function render(time) {
  refs.days.textContent = time.days;
  refs.hours.textContent = time.hours;
  refs.minutes.textContent = time.minutes;
  refs.seconds.textContent = time.seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
