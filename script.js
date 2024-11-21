const $ = (selector) => document.querySelector(selector);

const hour = $('.hour');
const dot = $('.dot');
const min = $('.min');
const week = $('.week');
const timezoneSelect = $('#timezone');
const timeFormatSelect = $('#time-format');
const periodElement = $('.period');
const dateElement = $('.date');

let showDot = true; 
let is24HourFormat = true; 

function updateTimeFormat() {
    is24HourFormat = timeFormatSelect.value === '24h';
    update(); 
}

function update() {
    showDot = !showDot; 
    const now = new Date();

    const timezoneOffset = parseInt(timezoneSelect.value.replace('UTC', ''));
    now.setHours(now.getHours() + timezoneOffset);

    let hours = now.getHours();
    let period = ''; 
    if (!is24HourFormat) {
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) hours -= 12; 
        } else {
            period = 'AM';
            if (hours === 0) hours = 12; 
        }
    }

    hour.textContent = String(hours).padStart(2, '0');
    min.textContent = String(now.getMinutes()).padStart(2, '0');
    dot.textContent = is24HourFormat ? ':' : ''; 
    periodElement.textContent = period;

    Array.from(week.children).forEach((ele) => {
        ele.classList.remove('active');
    });
    week.children[now.getDay()].classList.add('active');

    const date = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    dateElement.textContent = date;

    if (showDot) {
        dot.classList.add('invisible');
    } else {
        dot.classList.remove('invisible');
    }
}

setInterval(update, 500);

timezoneSelect.addEventListener('change', update);

timeFormatSelect.addEventListener('change', updateTimeFormat);

update();

