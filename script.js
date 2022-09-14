const tiles = document.querySelectorAll(".wrapper__tile");
const outerTiles = document.querySelectorAll(".wrapper__tile-outer");

const vertical1 = [...document.querySelectorAll(".vertical1")];
const vertical2 = [...document.querySelectorAll(".vertical2")];
const vertical3 = [...document.querySelectorAll(".vertical3")];
const vertical4 = [...document.querySelectorAll(".vertical4")];

const horizontal1 = [...document.querySelectorAll(".horizontal1")];
const horizontal2 = [...document.querySelectorAll(".horizontal2")];
const horizontal3 = [...document.querySelectorAll(".horizontal3")];
const horizontal4 = [...document.querySelectorAll(".horizontal4")];

const highScore = document.querySelector(".highScore");
let highScoreValue = 0;

function colors() {
    tiles.forEach(a => {
        switch(a.textContent) {
            case "":
                a.style.background = "";
                break;
            case "2":
                a.style.background = "#ff0000";
                break;
            case "4":
                a.style.background = "#ff8d00";
                break;
            case "8":
                a.style.background = "#fff800";
                break;
            case "16":
                a.style.background = "#75ff00";
                break;
            case "32":
                a.style.background = "#00ffc9";
                break;
            case "64":
                a.style.background = "#00c6ff";
                break;
            case "128":
                a.style.background = "#004eff";
                break;
            case "256":
                a.style.background = "#6200ff";
                break;
            case "512":
                a.style.background = "#d500ff";
                break;
            case "1024":
                a.style.background = "#ff00b1";
                break;
            case "2048":
                a.style.background = "linear-gradient(90deg, rgba(254,255,0,1) 0%, rgba(255,0,0,1) 100%)";
                break;
        }
    });
}

function firstInit() {
    let random = Math.floor(Math.random() * 15);
    let random2 = Math.floor(Math.random() * 16);

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

    colors();
}

firstInit();

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

                highScoreValue += +a[j].textContent;
                highScore.textContent = `${highScoreValue}`;
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

                highScoreValue += +a[j].textContent;
                highScore.textContent = `${highScoreValue}`;
            } 
            else if (a[j].textContent.trim() === "") {
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

                highScoreValue += +a[j].textContent;
                highScore.textContent = `${highScoreValue}`;
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

                highScoreValue += +a[j].textContent;
                highScore.textContent = `${highScoreValue}`;
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

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        moveLeftAll();
        randomNumber();
        colors();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
        moveRightAll();
        randomNumber();
        colors();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        moveUpAll();
        randomNumber();
        colors();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowDown") {
        moveDownAll();
        randomNumber();
        colors();
    }
});

//animations
//results
//flare
//random number fix