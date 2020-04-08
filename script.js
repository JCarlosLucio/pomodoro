const timerTime = document.querySelector('#timer-time');
const sessionTime = document.querySelector('#session-time');
const breakTime = document.querySelector('#break-time');

const increaseSession = document.querySelector('#increase-session');
const decreaseSession = document.querySelector('#decrease-session');
const increaseBreak = document.querySelector('#increase-break');
const decreaseBreak = document.querySelector('#decrease-break');

const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

function timer(time) {
    // const now = Date.now();
    const secs = Number(time);
    const startTime = Date.now() + (secs * 1000);
    timerDisplay(secs);

    // countdown function
    countdown(startTime);
}

function countdown(start) {
    setInterval(() => {
        secondsCountdown = Math.round((start - Date.now()) / 1000);

        timerDisplay(secondsCountdown);
    }, 1000);
}

function timerDisplay(timeInSeconds) {
    let timerMins = Math.floor(Number(timeInSeconds) / (60));
    let timerSecs = Number(timeInSeconds) % 60;
    timerTime.innerHTML = `${timerMins > 9 ? timerMins : '0' + timerMins}:${timerSecs > 9 ? timerSecs : '0' + timerSecs}`;
}

// Increase or Decrease Settings Time (Session or Break Time)
function modifySettings(time, btn) {
    btn.addEventListener('click', (e) => {
        let modifier = 0;
        if (btn.id.includes('increase')) {
            modifier = 1;
        } else {
            if (time.innerHTML > 1) {
                modifier = -1;
            }
        }
        time.innerHTML = Number(time.innerHTML) + modifier;
        if (time.id === 'session-time') {
            timerDisplay(time.innerHTML * 60);
        }
    });
}

modifySettings(sessionTime, increaseSession);
modifySettings(breakTime, increaseBreak);
modifySettings(sessionTime, decreaseSession);
modifySettings(breakTime, decreaseBreak);

// Reset Button
reset.addEventListener('click', (e) => {
    sessionTime.innerHTML = 1;
    breakTime.innerHTML = 1;
    timerDisplay(sessionTime.innerHTML * 60);
})