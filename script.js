const sessionTime = document.querySelector('#session-time');
const increaseSession = document.querySelector('#increase-session');
const decreaseSession = document.querySelector('#decrease-session');

const breakTime = document.querySelector('#break-time');
const increaseBreak = document.querySelector('#increase-break');
const decreaseBreak = document.querySelector('#decrease-break');

const timerTime = document.querySelector('#timer-time');

const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

function timer(time) {
    const now = Date.now();
    const secs = Number(time) * 60;
    const startTime = now + secs * 1000;
    timerDisplay(secs);
    // countdown function
}

// function countdown(start){

// }

function increase(time) {
    time.innerHTML = Number(time.innerHTML) + 1;
}
function decrease(time) {
    if (Number(time.innerHTML) > 1) {
        time.innerHTML = Number(time.innerHTML) - 1;
    }
}


function timerDisplay(time) {
    let timerMins = Number(time);
    let timerSecs = (timerMins * 60) % 60;
    timerTime.innerHTML = `${timerMins > 9 ? timerMins : '0' + timerMins}:${timerSecs > 9 ? timerSecs : '0' + timerSecs}`;
}

// Increase and Decrese Session Time
increaseSession.addEventListener('click', (e) => {
    increase(sessionTime);
    timerDisplay(sessionTime.innerHTML);
});
decreaseSession.addEventListener('click', (e) => {
    decrease(sessionTime);
    timerDisplay(sessionTime.innerHTML);
});

// Increase and Decrese Break Time
increaseBreak.addEventListener('click', (e) => {
    increase(breakTime);
});
decreaseBreak.addEventListener('click', (e) => {
    decrease(breakTime);
});

// Reset Button
reset.addEventListener('click', (e) => {
    sessionTime.innerHTML = 1;
    breakTime.innerHTML = 1;
    timerDisplay(sessionTime.innerHTML);
})