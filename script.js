const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angleInput = document.getElementById("angle");
let speedInput = document.getElementById("speed");
let fireButton = document.getElementById("fireButton");

// Game variables
const gravity = 9.8;
let projectile = { x: 100, y: 500, dx: 0, dy: 0, active: false };
let target = { x: Math.random() * 400 + 300, y: Math.random() * 300 + 200, radius: 20 };
let time = 0;

function drawCannon() {
  ctx.fillStyle = "black";
  ctx.fillRect(80, 480, 40, 20);
  ctx.beginPath();
  ctx.moveTo(100, 500);
  ctx.lineTo(
    100 + 50 * Math.cos((parseFloat(angleInput.value) * Math.PI) / 180),
    500 - 50 * Math.sin((parseFloat(angleInput.value) * Math.PI) / 180)
  );
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
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
    }

    // Check collision with the target
    const dist = Math.sqrt(
      (projectile.x - target.x) ** 2 + (projectile.y - target.y) ** 2
    );
    if (dist < target.radius) {
      alert("Hit!");
      resetGame();
    }
  }
}

function resetGame() {
  projectile.x = 100;
  projectile.y = 500;
  projectile.active = false;
  time = 0;
  target.x = Math.random() * 400 + 300;
  target.y = Math.random() * 300 + 200;
}

function fireProjectile() {
  if (!projectile.active) {
    const angleRad = (parseFloat(angleInput.value) * Math.PI) / 180;
    const speed = parseFloat(speedInput.value);

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

// Start the game
gameLoop();
