import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button');
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let intervalId = null;

btnStart.disabled = true;


btnStart.addEventListener("click", () => {

    btnStart.disabled = true;
    dateInput.disabled = true;

  intervalId = setInterval(() => {
    const chosenDate = new Date(dateInput.value);
    const timerDate = chosenDate - Date.now();
    if (timerDate <= 0) {
        clearInterval(intervalId);
        totalFormattedDate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        btnStart.disabled = false;
        dateInput.disabled = false;
        return;
    }
    
    const formTime = convertMs(timerDate);
    totalFormattedDate(formTime);

}, 1000);
});
  

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const totalFormattedDate = ({ days, hours, minutes, seconds }) => {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        userSelectedDate = selectedDates[0];
        const currentDate = Date.now();

        if (userSelectedDate <= currentDate) {
            btnStart.disabled = true;
            iziToast.error({
                position: 'topRight',
                messageColor: '#FFFFFF',
                color: '#EF4040',
                message: 'Please choose a date in the future'
            });
            
            
        }
        else {
            btnStart.disabled = false;
       
        };
    }
};

flatpickr("#datetime-picker", options);  



