const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angleInput = document.getElementById("angle");
let speedInput = document.getElementById("speed");
let fireAngleButton = document.getElementById("fireAngleButton");
let fireSpeedButton = document.getElementById("fireSpeedButton");
let targetDistanceDisplay = document.getElementById("targetDistance");
let givenSpeedDisplay = document.getElementById("givenSpeed");
let givenAngleDisplay = document.getElementById("givenAngle");
let roundDisplay = document.getElementById("round");
let scoreDisplay = document.getElementById("score");
let missesDisplay = document.getElementById("misses");

const gravity = 9.8;
let target = { x: Math.random() * 400 + 300, y: 500, radius: 20 };
let round = 1;
let score = 0;
let misses = 0;
let givenSpeed = Math.random() * 50 + 30; // Random speed
let givenAngle = Math.random() * 45 + 20; // Random angle

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#87ceeb");
  gradient.addColorStop(1, "#f0e68c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTarget() {
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function resetGame() {
  target.x = Math.random() * 400 + 300;
  targetDistanceDisplay.textContent = Math.abs(target.x - 100).toFixed(2);
  roundDisplay.textContent = round;
  scoreDisplay.textContent = score;
  missesDisplay.textContent = misses;

  givenSpeed = Math.random() * 50 + 30; // Randomize speed
  givenAngle = Math.random() * 45 + 20; // Randomize angle
  givenSpeedDisplay.textContent = givenSpeed.toFixed(2);
  givenAngleDisplay.textContent = givenAngle.toFixed(2);
}

function checkAngle(angle) {
  const correctAngle = Math.atan((2 * gravity * target.x) / Math.pow(givenSpeed, 2)) * (180 / Math.PI);
  const tolerance = 2; // Allowable error in angle
  if (Math.abs(angle - correctAngle) <= tolerance) {
    alert("Correct Angle! +10 Points");
    score += 10;
    nextRound();
  } else {
    alert("Wrong Angle! Try again.");
    misses++;
    if (misses >= 3) endGame();
  }
}

function checkSpeed(speed) {
  const correctSpeed = Math.sqrt((gravity * target.x ** 2) / (2 * target.x * Math.sin((givenAngle * Math.PI) / 180)));
  const tolerance = 2; // Allowable error in speed
  if (Math.abs(speed - correctSpeed) <= tolerance) {
    alert("Correct Speed! +10 Points");
    score += 10;
    nextRound();
  } else {
    alert("Wrong Speed! Try again.");
    misses++;
    if (misses >= 3) endGame();
  }
}

function nextRound() {
  if (round === 1) {
    round = 2;
    document.getElementById("round1Controls").style.display = "none";
    document.getElementById("round2Controls").style.display = "block";
  } else {
    round = 1;
    document.getElementById("round1Controls").style.display = "block";
    document.getElementById("round2Controls").style.display = "none";
  }
  resetGame();
}

function endGame() {
  alert("Game Over! Final Score: " + score);
  round = 1;
  score = 0;
  misses = 0;
  resetGame();
  document.getElementById("round1Controls").style.display = "block";
  document.getElementById("round2Controls").style.display = "none";
}

fireAngleButton.addEventListener("click", () => {
  const angle = parseFloat(angleInput.value);
  checkAngle(angle);
});

fireSpeedButton.addEventListener("click", () => {
  const speed = parseFloat(speedInput.value);
  checkSpeed(speed);
});

resetGame();
drawBackground();
drawTarget();
