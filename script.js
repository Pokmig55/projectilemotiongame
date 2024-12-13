const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const submitBtn = document.getElementById("submitBtn");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

let round = 1;
let score = 0;

// Game variables
let targetX = Math.floor(Math.random() * 300) + 400; // Target position
let targetY = canvas.height - 20;
let speed, angle;

// Generate target
function drawTarget() {
    ctx.beginPath();
    ctx.arc(targetX, targetY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Draw the cannonball
function drawCannonball(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// Calculate projectile motion
function calculateTrajectory(speed, angle) {
    const rad = (angle * Math.PI) / 180;
    const time = 2 * speed * Math.sin(rad) / 9.8;
    const points = [];

    for (let t = 0; t <= time; t += 0.1) {
        const x = speed * t * Math.cos(rad);
        const y = canvas.height - (speed * t * Math.sin(rad) - 0.5 * 9.8 * t * t);
        points.push({ x, y });
    }

    return points;
}

// Simulate shot
function shoot(speed, angle) {
    const trajectory = calculateTrajectory(speed, angle);
    let index = 0;

    const interval = setInterval(() => {
        if (index >= trajectory.length) {
            clearInterval(interval);
            feedback.textContent = "Missed! Try again.";
            return;
        }

        const { x, y } = trajectory[index];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTarget();
        drawCannonball(x, y);

        // Check if hit
        if (Math.abs(x - targetX) < 20 && Math.abs(y - targetY) < 20) {
            clearInterval(interval);
            feedback.textContent = "Hit! Well done!";
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            nextRound();
        }

        index++;
    }, 20);
}

// Handle user input
submitBtn.addEventListener("click", () => {
    const value = parseFloat(input.value);
    if (isNaN(value)) {
        feedback.textContent = "Enter a valid number.
