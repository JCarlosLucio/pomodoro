const timerTime = document.querySelector('#timer-time');
const sessionTime = document.querySelector('#session-time');
const breakTime = document.querySelector('#break-time');

const increaseSession = document.querySelector('#increase-session');
const decreaseSession = document.querySelector('#decrease-session');
const increaseBreak = document.querySelector('#increase-break');
const decreaseBreak = document.querySelector('#decrease-break');

const playPause = document.querySelector('#play-pause');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');

const body = document.querySelector('#body');
const state = document.querySelector('#state');
const workedTime = document.querySelector('#worked-time');
const relaxedTime = document.querySelector('#relaxed-time');
const sound = document.querySelector('#sound');

let interval;
let secondsCountdown;
let pausedWhile = 'Working';
let stoppedWhile = 'Working';
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
            sound.play();
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
function modifySettings(timeInMinutes, btn) {
    btn.addEventListener('click', (e) => {
        let modifier = 0;
        if (btn.id.includes('increase')) {
            if (timeInMinutes.innerHTML < 60) {
                modifier = 1;
            }
        } else {
            if (timeInMinutes.innerHTML > 1) {
                modifier = -1;
            }
        }
        timeInMinutes.innerHTML = Number(timeInMinutes.innerHTML) + modifier;
        // Only change the timer display to show whichever time is on at the moment
        if (body.classList.value === 'working' && timeInMinutes.id === 'session-time' ){
            timerDisplay(timeInMinutes.innerHTML * 60);
        } else if (body.classList.value === 'relaxing' && timeInMinutes.id === 'break-time'){
            timerDisplay(timeInMinutes.innerHTML * 60);
        }
    });
}

modifySettings(sessionTime, increaseSession);
modifySettings(breakTime, increaseBreak);
modifySettings(sessionTime, decreaseSession);
modifySettings(breakTime, decreaseBreak);

// Play 
playPause.addEventListener('click', (e) => {
    // STATE ?? WHEN PLAY
    if (playPause.firstElementChild.classList[1] === 'fa-play') {
        playPause.firstElementChild.classList.remove('fa-play');
        playPause.firstElementChild.classList.add('fa-pause');
        if (state.innerHTML === '') {
            if (stoppedWhile === 'Working') {
                timer(sessionTime.innerHTML * 60);
            } else if (stoppedWhile === 'Relaxing') {
                breakTimer(breakTime.innerHTML * 60);
            }
        } else if (state.innerHTML === 'Paused') {
            if (pausedWhile === 'Working') {
                state.innerHTML = 'Working'
                timer(secondsCountdown);
            } else if (pausedWhile === 'Relaxing') {
                state.innerHTML = 'Relaxing'
                breakTimer(secondsCountdown);
            }
        }
    } else if (playPause.firstElementChild.classList[1] === 'fa-pause') {
        playPause.firstElementChild.classList.remove('fa-pause');
        playPause.firstElementChild.classList.add('fa-play');
        clearInterval(interval);
        timerDisplay(secondsCountdown);
        pausedWhile = state.innerHTML;
        state.innerHTML = 'Paused';
    }
});

// Stop
stop.addEventListener('click', (e) => {
    clearInterval(interval);
    playPause.firstElementChild.classList.remove('fa-pause');
    playPause.firstElementChild.classList.add('fa-play');
    if (state.innerHTML === 'Paused') {
        state.innerHTML = pausedWhile;
    }
    stoppedWhile = state.innerHTML;
    if (stoppedWhile === 'Working') {
        timerDisplay(sessionTime.innerHTML * 60);
    } else if (stoppedWhile === 'Relaxing') {
        timerDisplay(breakTime.innerHTML * 60);
    }
    state.innerHTML = '';
})

// Reset Button
reset.addEventListener('click', (e) => {
    clearInterval(interval);
    playPause.firstElementChild.classList.remove('fa-pause');
    playPause.firstElementChild.classList.add('fa-play');
    stoppedWhile = 'Working';
    pausedWhile = 'Working';
    sessionTime.innerHTML = 25;
    breakTime.innerHTML = 5;
    state.innerHTML = '';
    worked = 0;
    relaxed = 0;
    workedTime.innerHTML = 0;
    relaxedTime.innerHTML = 0;
    body.classList.add('working');
    body.classList.remove('relaxing');
    timerDisplay(sessionTime.innerHTML * 60);
})