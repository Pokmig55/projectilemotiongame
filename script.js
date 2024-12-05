const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angleInput = document.getElementById("angle");
let fireButton = document.getElementById("fireButton");
let rangeDisplay = document.getElementById("range");
let speedDisplay = document.getElementById("speedDisplay");
let scoreDisplay = document.getElementById("score");

// Game variables
const gravity = 9.8;
let projectile = { x: 100, y: 500, dx: 0, dy: 0, active: false };
let target = { x: Math.random() * 400 + 300, y: 500, radius: 20 };
let speed = Math.random() * 30 + 50; // Random speed between 50 and 80 m/s
let time = 0;
let score = 0;

function drawCannon() {
  ctx.fillStyle = "black";
  ctx.fillRect(80, 480, 40, 20);
}

function drawProjectile() {
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawTarget() {
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function updateProjectile() {
  if (projectile.active) {
    time += 0.05;
    projectile.x = 100 + projectile.dx * time;
    projectile.y = 500 - (projectile.dy * time - 0.5 * gravity * time ** 2);

    // Check if projectile hits the ground or goes off-screen
    if (projectile.y > canvas.height || projectile.x > canvas.width) {
      projectile.active = false;
      checkScore();
    }
  }
}

function checkScore() {
  const dist = Math.sqrt((projectile.x - target.x) ** 2 + (projectile.y - target.y) ** 2);
  if (dist < target.radius) {
    alert("Direct hit! +10 points!");
    score += 10;
  } else if (dist < 50) {
    alert("Close! +5 points!");
    score += 5;
  } else {
    alert("Miss! Try again.");
  }
  resetGame();
}

function resetGame() {
  projectile.x = 100;
  projectile.y = 500;
  projectile.active = false;
  time = 0;
  target.x = Math.random() * 400 + 300;
  speed = Math.random() * 30 + 50;
  rangeDisplay.textContent = `300 to 700`;
  speedDisplay.textContent = speed.toFixed(1);
  scoreDisplay.textContent = score;
}

function fireProjectile() {
  if (!projectile.active) {
    const angleRad = (parseFloat(angleInput.value) * Math.PI) / 180;

    projectile.dx = speed * Math.cos(angleRad);
    projectile.dy = speed * Math.sin(angleRad);
    projectile.active = true;
    time = 0;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCannon();
  drawTarget();
  if (projectile.active) {
    drawProjectile();
    updateProjectile();
  }

  requestAnimationFrame(gameLoop);
}

fireButton.addEventListener("click", fireProjectile);

// Initialize game
rangeDisplay.textContent = `300 to 700`;
speedDisplay.textContent = speed.toFixed(1);
scoreDisplay.textContent = score;
gameLoop();

