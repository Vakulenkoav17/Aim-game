const startBtn = document.querySelector(".start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");
const restartBtn = document.querySelector("#restart");
const result = document.querySelector("#result");
const mainSound = document.querySelector("#main");
const hitSound = document.querySelector("#hit");
const weeSound = document.querySelector("#wee");
const body = document.querySelector("body");
let soundPlay = "false";
const pressedBtns = [];
const secret = "sas";

let circle = document.createElement("div");
const colorRGB = [2, 255, 155];

body.onkeydown = (e) => {
  e.preventDefault();
  pressedBtns.push(e.key);
  pressedBtns.splice(-secret.length - 1, pressedBtns.length - secret.length);
  if (pressedBtns.join("").includes(secret)) {
    createSas();
  }
};

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  soundPlay = confirm("Включить музлоу ?");

  if (soundPlay === true) {
    mainSound.volume = 0.3;
    mainSound.play();
  }
  screens[0].classList.add("up");
});

let time = 0;
let score = 0;

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    screens[1].classList.add("up");
    time = parseInt(event.target.getAttribute("data-time"));
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    hitSound.play();
    event.target.remove();
    createRandCircle();
  }
});

function startGame() {
  interval = setInterval(decreaseTime, 1000);
  setTime(time);
  createRandCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
    clearInterval(interval);
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timer.innerHTML = `00:${value}`;
}

function finishGame() {
  circle.remove();
  result.innerHTML = `Счет: ${score}`;
  restartBtn.classList.remove("hide");
}

let restart = (restartBtn.onclick = () => {
  screens[1].classList.remove("up");
  restartBtn.classList.add("hide");
  result.innerHTML = "";
  score = 0;
});

function createSas() {
  let sas = new Image();
  sas.src = "/sounds/image.png";
  sas.classList.add("image");
  body.prepend(sas);
  weeSound.play();
  weeSound.loop = true;
}

function createRandCircle() {
  const size = getRandNumber(10, 60);

  const { width, height } = board.getBoundingClientRect();
  const x = getRandNumber(0, width - size);
  const y = getRandNumber(0, height - size);
  getRandColor();
  const rgbColor = `rgb(${colorRGB.toString()})`;
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = rgbColor;
  circle.style.boxShadow = `0 0 2px ${rgbColor}, 0 0 10px ${rgbColor}`;
  ``;

  board.append(circle);
}

function getRandNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandColor() {
  for (let i = 0; i < 3; i++) {
    num = getRandNumber(0, 255);
    colorRGB[i] = num;
  }
}
