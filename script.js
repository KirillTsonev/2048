///////////////
// Variables //
///////////////

const container = document.querySelector(".container");
let tiles = [...document.querySelectorAll(".wrapper__tile")];

const vertical1 = [...document.querySelectorAll(".vertical1")];
const vertical2 = [...document.querySelectorAll(".vertical2")];
const vertical3 = [...document.querySelectorAll(".vertical3")];
const vertical4 = [...document.querySelectorAll(".vertical4")];

const horizontal1 = [...document.querySelectorAll(".horizontal1")];
const horizontal2 = [...document.querySelectorAll(".horizontal2")];
const horizontal3 = [...document.querySelectorAll(".horizontal3")];
const horizontal4 = [...document.querySelectorAll(".horizontal4")];

const score = document.querySelector(".header__score");
let scoreValue = 0;
const highScore = document.querySelector(".header__highscore");
let highScoreValue = 0;

const modalWinOverlay = document.querySelector(".modal__win__overlay");
const modalLoseOverlay = document.querySelector(".modal__lose__overlay");
const modalClose = document.querySelector(".modal__close");
const modalWin = document.querySelector(".modal__win");
const modalLose = document.querySelector(".modal__lose");
const scoreModal = document.querySelector(".modal__score");

const newGame = document.querySelector(".button-newGame");
const continueGame = document.querySelector(".button-continueGame");
const newGameNoConf = document.querySelectorAll(".button-newGameNoConf");

let arrOne = [];
let arrTwo = [];
let arrThree = [];
let result = [];

const confirmation = document.createElement("div");
confirmation.classList.add("header__confirmation");
confirmation.textContent = "Are you sure?";

let checkVictoryResult = false;
if (localStorage.getItem("checkVictoryResult")) {
    checkVictoryResult = localStorage.getItem("checkVictoryResult");
}

let checkLossResult = false;
if (localStorage.getItem("checkLossResult")) {
    checkLossResult = localStorage.getItem("checkLossResult");
}

///////////////
// Functions //
///////////////

function colors() {
    tiles.forEach(a => {
        switch(a.textContent) {
            case "":
                a.style.background = "";
                break;
            case "2":
                a.style.background = "#e05d7d";
                break;
            case "4":
                a.style.background = "#ffa363";
                break;
            case "8":
                a.style.background = "#fbe65a";
                break;
            case "16":
                a.style.background = "#c6f05d";
                break;
            case "32":
                a.style.background = "#5bdb6b";
                break;
            case "64":
                a.style.background = "#5edaf5";
                break;
            case "128":
                a.style.background = "#4e6bd6";
                break;
            case "256":
                a.style.background = "#cfa9fb";
                break;
            case "512":
                a.style.background = "#af46cf";
                break;
            case "1024":
                a.style.background = "#ed5ae5";
                break;
            case "2048":
                a.style.background = "linear-gradient(90deg, rgba(254,255,0,1) 0%, rgba(255,0,0,1) 100%)";
                break;
            case "4096":
                a.style.background = "linear-gradient(90deg, rgba(0,255,3,1) 0%, rgba(252,0,255,1) 100%)";
                break;
        }
    });
}

function checkPrevGame() {
    if (localStorage.getItem("startPosition")) {
        for (let i = 0; i < 16; i++) {
            tiles[i].textContent = JSON.parse(localStorage.getItem("startPosition"))[i];
            highScoreValue = +localStorage.getItem("highScore");
            highScore.textContent = highScoreValue;
            scoreValue = +localStorage.getItem("score");
            score.textContent = scoreValue;
            colors();
        }
    } else {
        firstInit();
    }
}

function firstInit() {
    let random = Math.floor(Math.random() * 15);
    let random2 = Math.floor(Math.random() * 16);

    highScore.textContent = localStorage.getItem("highScore");

    if (random === random2) {
        random2++;
    }
    
    tiles.forEach((a, i) => {
        if (i === random) {
            a.textContent = 2;
        }
    });
    
    tiles.forEach((a, i) => {
        if (i === random2) {
            a.textContent = 2;
        }
    });

    setStartingPosition();
    colors();
    recordOne();
}

function randomNumber() {
    let random = Math.floor(Math.random() * 16);

    tiles.forEach((a, i) => {
        if (i === random) {
            if (a.textContent.trim() === '') {
                a.classList.add("scaleNew");
                a.textContent = 2;

                setTimeout(() => {
                    a.classList.remove("scaleNew");
                }, 500);
            } else {
                randomNumber();
            }
        }
    });
}

function setScore() {
    if (scoreValue >= Number(localStorage.getItem("highScore"))) {
        highScoreValue = scoreValue;
        highScore.textContent = highScoreValue;
        localStorage.setItem("highScore", highScoreValue);
    }
    localStorage.setItem("score", scoreValue);
}

function setStartingPosition() {
    tiles.forEach(a => {
        arrThree.push(a.textContent);
    });
    localStorage.setItem("startPosition", JSON.stringify(arrThree));
    arrThree = [];
}

function moveUpLeft(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[j].textContent === a[j + 1].textContent && a[j + 1].textContent.trim() !== "") {
                a[j].textContent = a[j + 1].textContent * 2;
                a[j + 1].textContent = "";

                a[j].classList.add("scaleSum");
                setTimeout(() => {
                    a[j].classList.remove("scaleSum");
                }, 500);

                scoreValue += +a[j].textContent;
                score.textContent = `${scoreValue}`;
            } 
            else if (a[j].textContent.trim() === "") {
                a[j].textContent = a[j + 1].textContent;
                a[j + 1].textContent = "";
            }
        }
    }
}

function moveRightDown(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j > 0; j--) {
            if (a[j].textContent === a[j - 1].textContent && a[j - 1].textContent.trim() !== "") {
                a[j].textContent = a[j - 1].textContent * 2;
                a[j - 1].textContent = "";

                a[j].classList.add("scaleSum");
                setTimeout(() => {
                    a[j].classList.remove("scaleSum");
                }, 500);

                scoreValue += +a[j].textContent;
                score.textContent = `${scoreValue}`;
            } else if (a[j].textContent.trim() === "") {
                a[j].textContent = a[j - 1].textContent;
                a[j - 1].textContent = "";
            }
        }
    }
}

function moveLeftAll() {
    moveUpLeft(horizontal1);
    moveUpLeft(horizontal2);
    moveUpLeft(horizontal3);
    moveUpLeft(horizontal4);
}

function moveUpAll() {
    moveUpLeft(vertical1);
    moveUpLeft(vertical2);
    moveUpLeft(vertical3);
    moveUpLeft(vertical4);
}

function moveRightAll() {
    moveRightDown(horizontal1);
    moveRightDown(horizontal2);
    moveRightDown(horizontal3);
    moveRightDown(horizontal4);
}

function moveDownAll() {
    moveRightDown(vertical1);
    moveRightDown(vertical2);
    moveRightDown(vertical3);
    moveRightDown(vertical4);
}

function recordOne() {
    tiles.forEach(a => {
        arrOne.push(a.textContent);
    });
}

function recordTwo() {
    tiles.forEach(a => {
        arrTwo.push(a.textContent);
    });
}

function playGame(moveFunc) {
    recordOne();
    moveFunc();
    setScore();
    recordTwo();
    console.log(arrOne);
    console.log(arrTwo);
    determineLoss();
    if (result.every(a => a === true) && tiles.every(a => a.textContent.trim() !== "")) {
        loss();
    }
    if (JSON.stringify(arrOne) !== JSON.stringify(arrTwo)) {
        randomNumber();
    }
    setStartingPosition();
    colors();
    arrOne = [];
    arrTwo = [];
    tiles.forEach(a => {
        if (a.textContent === "2048") {
            victory();
        }
    });
}

function showModal (selectorVictory, selectorOverlay) {
    selectorVictory.classList.add("show");
    selectorOverlay.classList.add("show");
    selectorVictory.classList.remove("hide");
    selectorOverlay.classList.remove("hide");
    selectorVictory.classList.add("modalAppear");
    selectorOverlay.classList.add("modalOverlayAppear");
    setTimeout(() => {
        selectorVictory.classList.remove("modalAppear");
        selectorOverlay.classList.remove("modalOverlayAppear");
    }, 2500);
}

function hideModal (selectorVictory, selectorOverlay) {
    selectorVictory.classList.add("modalDisappear");
    selectorOverlay.classList.add("modalOverlayDisappear");
    setTimeout(() => {
        selectorVictory.classList.remove("modalDisappear");
        selectorOverlay.classList.remove("modalOverlayDisappear");
        selectorVictory.classList.remove("show");
        selectorOverlay.classList.remove("show");
        selectorVictory.classList.add("hide");
        selectorOverlay.classList.add("hide");
    }, 2000);
}

function modalCloseTriggers(selectorVictory, selectorOverlay) {
    selectorOverlay.addEventListener("click", (e) => {
        if (e.target === selectorOverlay || e.target.getAttribute("data-close") === "") {
            hideModal(selectorVictory, selectorOverlay);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && !selectorVictory.classList.contains("hide")) {
            hideModal(selectorVictory, selectorOverlay);
        }
    });
}

function victory() {
    if (checkVictoryResult === false) {
        setTimeout(() => {
            showModal(modalWin, modalWinOverlay);
            modalCloseTriggers(modalWin, modalWinOverlay);
            scoreModal.textContent = scoreValue;
        }, 500);
    }
    checkVictoryResult = true;
    localStorage.setItem("checkVictoryResult", checkVictoryResult);
}

function determineLoss() {
    for (let i = 0; i < 3; i++) {
        if (horizontal1[i] !== horizontal1[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (horizontal2[i] !== horizontal2[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (horizontal3[i] !== horizontal3[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (horizontal4[i] !== horizontal4[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (vertical1[i] !== vertical1[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (vertical2[i] !== vertical2[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (vertical3[i] !== vertical3[i + 1]) {
            result.push(true);
        }
    }
    for (let i = 0; i < 3; i++) {
        if (vertical4[i] !== vertical4[i + 1]) {
            result.push(true);
        }
    }
}

function loss() {
    if (checkLossResult === false) {
        setTimeout(() => {
            showModal(modalLose, modalLoseOverlay);
            modalCloseTriggers(modalLose, modalLoseOverlay);
            scoreModal.textContent = scoreValue;
        }, 500);
    }
    checkLossResult = true;
}

/////////////////////
// Event Listeners //
/////////////////////

newGame.addEventListener("click", () => {
    newGame.replaceWith(confirmation);
    container.addEventListener("click", (e) => {
        if (e.target !== newGame) {
            confirmation.replaceWith(newGame);
        }
    });
    setTimeout(() => {
        confirmation.replaceWith(newGame);
    }, 1300);
});

confirmation.addEventListener("click", () => {
    localStorage.removeItem("checkVictoryResult");
    localStorage.removeItem("score");
    localStorage.removeItem("startPosition");
    checkVictoryResult = false;
    checkLossResult = false;
    scoreValue = 0;
    score.textContent = scoreValue;
    tiles.forEach(a => {
        a.textContent = "";
    });
    firstInit();
    confirmation.replaceWith(newGame);
});

newGameNoConf.forEach(a => {
    a.addEventListener("click", () => {
        localStorage.removeItem("checkVictoryResult");
        localStorage.removeItem("score");
        localStorage.removeItem("startPosition");
        checkVictoryResult = false;
        scoreValue = 0;
        score.textContent = scoreValue;
        tiles.forEach(a => {
            a.textContent = "";
        });
        firstInit();
        hideModal(modalWin, modalWinOverlay);
        hideModal(modalLose, modalLoseOverlay);
    });
});

continueGame.addEventListener("click", () => {
    hideModal(modalWin, modalWinOverlay);
    modalCloseTriggers(modalWin, modalWinOverlay);
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        playGame(moveLeftAll);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
        playGame(moveRightAll);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        playGame(moveUpAll);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown") {
        playGame(moveDownAll);
    }
});

////////////////////
// Function Calls //
////////////////////

checkPrevGame();