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
        // const time = convertMs(diff);
        // this.render(time);
        if (diff <= 0) { 
          this.stop();
          Notiflix.Notify.success('Timer finished!');
          return;
        }
        const time = convertMs(diff);
        this.render(time);
      }, 1000);
    }else {
      Notiflix.Notify.failure('Please choose a date in the future');
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
refs.startBtn.disabled = true;
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
  refs.days.textContent = String(time.days).padStart(2, '0');
  refs.hours.textContent = String(time.hours).padStart(2, '0');
  refs.minutes.textContent = String(time.minutes).padStart(2, '0');
  refs.seconds.textContent = String(time.seconds).padStart(2, '0');
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
