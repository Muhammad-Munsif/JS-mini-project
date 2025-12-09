let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "grey", "purple", "red"];

let started = false;
let level = 0;
let highScore = 0;

let levelDisplay = document.getElementById("levelDisplay");
let highScoreDisplay = document.getElementById("highScoreDisplay");
let statusDisplay = document.getElementById("statusDisplay");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");

// Event listeners
document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

startBtn.addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

resetBtn.addEventListener("click", function () {
  resetGame();
});

function startGame() {
  console.log("Game Started");
  started = true;
  statusDisplay.textContent = "Playing";
  statusDisplay.style.color = "#00ffcc";
  level = 0;
  gameSeq = [];
  userSeq = [];
  levelUp();
}

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelDisplay.textContent = "0";
  statusDisplay.textContent = "Ready";
  statusDisplay.style.color = "#ffcc00";
  document.body.classList.remove("game-over");

  // Reset button colors
  let allBtns = document.querySelectorAll(".btn");
  allBtns.forEach((btn) => {
    btn.classList.remove("flashBtn");
    btn.classList.remove("userFlash");
  });
}

function btnFlash(btn) {
  btn.classList.add("flashBtn");
  setTimeout(function () {
    btn.classList.remove("flashBtn");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  levelDisplay.textContent = level;

  if (level > highScore) {
    highScore = level;
    highScoreDisplay.textContent = highScore;
  }

  // Random color selection
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  // Add to sequence and flash
  gameSeq.push(randColor);
  console.log("Game sequence:", gameSeq);

  // Show sequence to user
  let i = 0;
  let sequenceInterval = setInterval(function () {
    if (i >= gameSeq.length) {
      clearInterval(sequenceInterval);
      return;
    }

    let currentBtn = document.querySelector(`#${gameSeq[i]}`);
    btnFlash(currentBtn);
    i++;
  }, 600);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      statusDisplay.textContent = "Correct!";
      setTimeout(levelUp, 1000);
    }
  } else {
    // Game over
    statusDisplay.textContent = "Game Over!";
    statusDisplay.style.color = "#ff4757";

    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 1000);

    // Reset game after delay
    setTimeout(function () {
      resetGame();
    }, 3000);
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Add event listeners to buttons
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

// Initialize high score display
highScoreDisplay.textContent = highScore;
