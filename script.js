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

let interval;
let secondsCountdown;
let pomodoro = 0;

function timer(timeInSeconds) {
    countdown(timeInSeconds);
}
function breakTimer(timeInSeconds) {
    countdown(timeInSeconds);
}

function switchState() {
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
            pomodoro++
            timerDisplay(breakTime.innerHTML * 60);
            // ADD CHANGE OF BACKGROUND COLOR
            // AND CHANGE OF STATE FROM SESSION TO BREAK
            switchState();
            state.innerHTML = 'Relaxing';
            // ADD COUNTER OF TIMES FOR SESSION AND BREAKS
            // DISABLE SESSION BUTTONS WHILE TIMER IS ON - RENABLE WITH STOP/ or smth
            breakTimer(breakTime.innerHTML * 60);
            // IF STATEMENT ...
            // Add Loop for Session Timer to start again!!!
            if (secondsCountdown < 0) {
                clearInterval(interval);
                secondsCountdown = 0;
                timerDisplay(sessionTime.innerHTML * 60);
                switchState();
                state.innerHTML = 'Working';
                timer(sessionTime.innerHTML * 60);
            } else {
                timerDisplay(secondsCountdown);
            }
        } else {
            timerDisplay(secondsCountdown);
        }
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

// Play 
play.addEventListener('click', (e) => {
    // STATE ?? WHEN PLAY
    timer(sessionTime.innerHTML * 60);
});

// Stop
stop.addEventListener('click', (e) => {
    clearInterval(interval);
    timerDisplay(sessionTime.innerHTML * 60);
})

// Reset Button
reset.addEventListener('click', (e) => {
    clearInterval(interval);
    sessionTime.innerHTML = 1;
    breakTime.innerHTML = 1;
    body.classList.add('working');
    body.classList.remove('relaxing');
    timerDisplay(sessionTime.innerHTML * 60);
})