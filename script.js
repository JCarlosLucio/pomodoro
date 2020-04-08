const sessionTime = document.querySelector('#session-time');
const addSessionTime = document.querySelector('#add-session-time');
const subsSessionTime = document.querySelector('#subs-session-time');

const breakTime = document.querySelector('#break-time');
const addBreakTime = document.querySelector('#add-break-time');
const subsBreakTime = document.querySelector('#subs-break-time');

const timerTime = document.querySelector('#timer-time');

const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

function timeDisplay(time) {
    timerTime.innerHTML = `${time}:00`;
}

addSessionTime.addEventListener('click', (e) => {
    sessionTime.innerHTML = Number(sessionTime.innerHTML) + 1;
    timeDisplay(sessionTime.innerHTML);
});
subsSessionTime.addEventListener('click', (e) => {
    if (Number(sessionTime.innerHTML > 1)) {
        sessionTime.innerHTML = Number(sessionTime.innerHTML) - 1;
    }
    timeDisplay(sessionTime.innerHTML);
});
addBreakTime.addEventListener('click', (e) => {
    breakTime.innerHTML = Number(breakTime.innerHTML) + 1;
});
subsBreakTime.addEventListener('click', (e) => {
    if (Number(breakTime.innerHTML) > 1) {
        breakTime.innerHTML = Number(breakTime.innerHTML) - 1;
    }
});
reset.addEventListener('click', (e) => {
    sessionTime.innerHTML = 25;
    breakTime.innerHTML = 5;
    timeDisplay(sessionTime.innerHTML);
})