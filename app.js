let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

// accessing h2 for updating new messages
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    // console.log("Game started");
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    // need to change bc for a moment
    btn.classList.add("flash");
    // remove it after timeout
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    // need to change bc for a moment
    btn.classList.add("userFlash");
    // remove it after timeout
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}
// used to track highest level
let highestLevel = level;
function highestCheck() {
    if(highestLevel > level) {
        return;
    }
    else {
        highestLevel = level;
    }
}

function levelUp() {
    userSeq = [];
    level++;
    highestCheck();
    h2.innerText = `Level ${level}`;
    // random btn choose
    let randIdx = Math.floor(Math.random() *3);
    let randomColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    // console.log(randIdx);
    // console.log(randbtn);
    // console.log(randomColor);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
// to match user and random
function checkAns(idx) {
    // console.log("curr level: ", level)
    // let idx = level-1; 
    if(userSeq[idx] == gameSeq[idx]) {
        // console.log("same value");
        if(userSeq.length == gameSeq.length) {
            // levelUp();
            setTimeout(levelUp, 1000);
        }
    }
    else {
        // h2.innerText = "Game Over! Press any key to start";
        // in innertext we can not use tag so we are not able to use <b> thats why using innerHTMl
        h2.innerHTML = `Game Over! Your score was: <b>${level}</b> </br>Press any key to start </br> Highest score is: ${highestLevel}`;
        document.querySelector("body").style.backgroundColor = "red";
        // to reset the bg color to white 
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        // used to restart the game
        // highestLevel = level; 
        reset();
    }
}

function btnPress() {
    // console.log("btn was press");
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}