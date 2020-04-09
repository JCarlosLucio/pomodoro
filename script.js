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

const body = document.querySelector('#body');
const state = document.querySelector('#state');
const workedTime = document.querySelector('#worked-time');
const relaxedTime = document.querySelector('#relaxed-time');

let interval;
let secondsCountdown;
let pausedWhile;
let worked = 0;
let relaxed = 0;

function timer(timeInSeconds) {
    state.innerHTML = 'Working';
    countdown(timeInSeconds);
}
function breakTimer(timeInSeconds) {
    state.innerHTML = 'Relaxing';
    countdown(timeInSeconds);
}

function switchStateBg() {
    body.classList.toggle('working');
    body.classList.toggle('relaxing');
}

function countdown(timeInSeconds) {
    const startTime = Date.now() + (Number(timeInSeconds) * 1000);
    interval = setInterval(() => {
        secondsCountdown = Math.round((startTime - Date.now()) / 1000);
        if (secondsCountdown < 0) {
            clearInterval(interval);
            secondsCountdown = 0;
            switchStateBg();
            // IF STATEMENT ... TO DECIDE WHICH TIMER TO RUN (SESSION OR BREAK)
            // Use Recursion to make Timer loop!!!
            // ADD COUNTER OF TIMES FOR SESSION AND BREAKS
            if (state.innerHTML === 'Working') {
                timerDisplay(breakTime.innerHTML * 60);
                worked += Number(sessionTime.innerHTML);
                timeSpentDisplay(worked)
                state.innerHTML = 'Relaxing';
                breakTimer(breakTime.innerHTML * 60);
            } else {
                timerDisplay(sessionTime.innerHTML * 60);
                relaxed += Number(breakTime.innerHTML);
                timeSpentDisplay(relaxed);
                state.innerHTML = 'Working';
                timer(sessionTime.innerHTML * 60);
            }
        } else {
            timerDisplay(secondsCountdown);
        }
    }, 1000);
}

function timeSpentDisplay(timeInMinutes) {
    let spentMins = timeInMinutes % 60;
    let spentHrs = Math.floor(timeInMinutes / 60);
    if (state.innerHTML === 'Relaxing') {
        relaxedTime.innerHTML = `${spentHrs > 9 ? spentHrs : '0' + spentHrs}h${spentMins > 9 ? spentMins : '0' + spentMins}m`;
    } else {
        workedTime.innerHTML = `${spentHrs > 9 ? spentHrs : '0' + spentHrs}h${spentMins > 9 ? spentMins : '0' + spentMins}m`;
    }
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

// Play 
play.addEventListener('click', (e) => {
    // STATE ?? WHEN PLAY
    if (state.innerHTML === '') {
        timer(sessionTime.innerHTML * 60);
    } else if (state.innerHTML === 'Paused') {
        if (pausedWhile === 'Working') {
            state.innerHTML = 'Working'
            timer(secondsCountdown);
        } else if (pausedWhile === 'Relaxing') {
            state.innerHTML = 'Relaxing'
            breakTimer(secondsCountdown);
        }
    }
});

// Pause
pause.addEventListener('click', (e) => {
    clearInterval(interval);
    timerDisplay(secondsCountdown);
    pausedWhile = state.innerHTML;
    state.innerHTML = 'Paused';
});

// Stop
stop.addEventListener('click', (e) => {
    clearInterval(interval);
    if (state.innerHTML === 'Working') {
        timerDisplay(sessionTime.innerHTML * 60);
    } else {
        timerDisplay(breakTime.innerHTML * 60);
    }
})

// Reset Button
reset.addEventListener('click', (e) => {
    clearInterval(interval);
    sessionTime.innerHTML = 1;
    breakTime.innerHTML = 1;
    state.innerHTML = '';
    worked = 0;
    relaxed = 0;
    workedTime.innerHTML = 0;
    relaxedTime.innerHTML = 0;
    body.classList.add('working');
    body.classList.remove('relaxing');
    timerDisplay(sessionTime.innerHTML * 60);
})