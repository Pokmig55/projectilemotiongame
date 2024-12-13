const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 9.8; // Gravity constant
const correctAngle = 35; // Correct angle for Round 1
const initialSpeed = 15; // Given speed for Round 1
const targetDistance = 21.55; // Target horizontal distance

// Cannon and Target Positions
let cannonX = 100;
let cannonY = canvas.height - 20;
let targetX = cannonX + targetDistance * 20; // Scale distance for canvas
let targetY = canvas.height - 20;

// Draw Cannon
function drawCannon() {
    ctx.fillStyle = "gray";
    ctx.fillRect(cannonX, cannonY - 20, 50, 20);
    ctx.beginPath();
    ctx.arc(cannonX + 25, cannonY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

// Draw Target
function drawTarget() {
    ctx.beginPath();
    ctx.arc(targetX, targetY - 10, 20, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// Shoot Function
function shoot(speed, angle) {
    let time = 0;
    const rad = (angle * Math.PI) / 180;

    const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawCannon();
        drawTarget();

        const x = cannonX + 50 + speed * Math.cos(rad) * time * 10; // Scaled x
        const y = cannonY - (speed * Math.sin(rad) * time - 0.5 * gravity * time ** 2) * 10; // Scaled y

        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2); // Draw projectile
        ctx.fillStyle = "black";
        ctx.fill();

        if (Math.abs(x - targetX) < 20 && Math.abs(y - targetY) < 20) {
            alert("Correct! Moving to next round.");
            clearInterval(interval);
            startRound2();
        }

        if (y > canvas.height || x > canvas.width) {
            alert("Missed! Try again.");
            clearInterval(interval);
        }

        time += 0.05; // Increment time
    }, 20); // Frame interval
}

// Round 1 Initialization
function startRound1() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCannon();
    drawTarget();
    document.getElementById("shootButton").addEventListener("click", () => {
        const angle = parseFloat(document.getElementById("angleInput").value);
        if (Math.abs(angle - correctAngle) <= 1) {
            shoot(initialSpeed, angle);
        } else {
            alert("Incorrect angle! Try again.");
        }
    });
}

// Start Round 2 (Placeholder)
function startRound2() {
    alert("Round 2 starting soon! Implement logic here.");
}

// Initialize Game
startRound1();
