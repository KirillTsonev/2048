let tiles = [...document.querySelectorAll(".wrapper__tile")];
const outerTiles = document.querySelectorAll(".wrapper__tile-outer");

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

const newGame = document.querySelector(".header__button");

let arrOne = [];
let arrTwo = [];
let arrThree = [];

const confirmation = document.createElement("div");
confirmation.classList.add("header__confirmation");
confirmation.textContent = "Are you sure?";

newGame.addEventListener("click", () => {
    newGame.replaceWith(confirmation);
    setTimeout(() => {
        confirmation.replaceWith(newGame);
    }, 2500);
});

confirmation.addEventListener("click", () => {
    localStorage.removeItem("score");
    scoreValue = 0;
    score.textContent = scoreValue;
    localStorage.removeItem("startPosition");
    tiles.forEach(a => {
        a.textContent = "";
    });
    firstInit();
    confirmation.replaceWith(newGame);
});

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

checkPrevGame();

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
                }, 400);
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

function moveLeft(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[j].textContent === a[j + 1].textContent && a[j + 1].textContent.trim() !== "") {
                a[j].textContent = a[j + 1].textContent * 2;
                a[j + 1].textContent = "";

                // a[j - 1].classList.add("scaleSum");
                // setTimeout(() => {
                //     a[j].classList.remove("scaleSum");
                // }, 500);

                scoreValue += +a[j].textContent;
                score.textContent = `${scoreValue}`;
            } 
            else if (a[j].textContent.trim() === "") {
                // setTimeout(() => {
                    a[j].textContent = a[j + 1].textContent;
                    a[j + 1].textContent = "";
                // }, 4);
            }
        }
    }
}

function moveUp(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (a[j].textContent === a[j + 1].textContent && a[j + 1].textContent.trim() !== "") {
                a[j].textContent = a[j + 1].textContent * 2;
                a[j + 1].textContent = "";

                scoreValue += +a[j].textContent;
                score.textContent = `${scoreValue}`;
            } else if (a[j].textContent.trim() === "") {
                a[j].textContent = a[j + 1].textContent;
                a[j + 1].textContent = "";
            }
        }
    }
}

function moveDown(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j > 0; j--) {
            if (a[j].textContent === a[j - 1].textContent && a[j - 1].textContent.trim() !== "") {
                a[j].textContent = a[j - 1].textContent * 2;
                a[j - 1].textContent = "";

                scoreValue += +a[j].textContent;
                score.textContent = `${scoreValue}`;
            } else if (a[j].textContent.trim() === "") {
                a[j].textContent = a[j - 1].textContent;
                a[j - 1].textContent = "";
            }
        }
    }
}

function moveRight(a) {
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j > 0; j--) {
            if (a[j].textContent === a[j - 1].textContent && a[j - 1].textContent.trim() !== "") {
                a[j].textContent = a[j - 1].textContent * 2;
                a[j - 1].textContent = "";

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
    moveLeft(horizontal1);
    moveLeft(horizontal2);
    moveLeft(horizontal3);
    moveLeft(horizontal4);
}

function moveUpAll() {
    moveUp(vertical1);
    moveUp(vertical2);
    moveUp(vertical3);
    moveUp(vertical4);
}

function moveRightAll() {
    moveRight(horizontal1);
    moveRight(horizontal2);
    moveRight(horizontal3);
    moveRight(horizontal4);
}

function moveDownAll() {
    moveDown(vertical1);
    moveDown(vertical2);
    moveDown(vertical3);
    moveDown(vertical4);
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

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        recordOne();
        moveLeftAll();
        setScore();
        recordTwo();
        if (JSON.stringify(arrOne) !== JSON.stringify(arrTwo)) {
            randomNumber();
        }
        setStartingPosition();
        colors();
        arrOne = [];
        arrTwo = [];
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
        recordOne();
        moveRightAll();
        setScore();
        recordTwo();
        if (JSON.stringify(arrOne) !== JSON.stringify(arrTwo)) {
            randomNumber();
        }
        setStartingPosition();
        colors();
        arrOne = [];
        arrTwo = [];
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        recordOne();
        moveUpAll();
        setScore();
        recordTwo();
        if (JSON.stringify(arrOne) !== JSON.stringify(arrTwo)) {
            randomNumber();
        }
        setStartingPosition();
        colors();
        arrOne = [];
        arrTwo = [];
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown") {
        recordOne();
        moveDownAll();
        setScore();
        recordTwo();
        if (JSON.stringify(arrOne) !== JSON.stringify(arrTwo)) {
            randomNumber();
        }
        setStartingPosition();
        colors();
        arrOne = [];
        arrTwo = [];
    }
});

//animations
//results
//flare