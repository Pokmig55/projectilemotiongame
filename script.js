const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 9.8;

// Cannon and Target
let cannonX = 100, cannonY = canvas.height - 50;
let targetX = Math.floor(Math.random() * 400) + 300;
let targetY = canvas.height - 20;

// User Input Variables
let speed = 50; // Fixed speed
let angle; // User's input for angle
let time = 0; // Timer for projectile motion
let interval;

// HTML Elements for Stats
const speedDisplay = document.getElementById("speedDisplay");
const angleDisplay = document.getElementById("angleDisplay");
const distanceDisplay = document.getElementById("distanceDisplay");
const heightDisplay = document.getElementById("heightDisplay");

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
    ctx.arc(targetX, targetY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// Draw Cannonball
function drawCannonball(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

// Calculate Projectile Motion (SUVAT)
function calculatePosition(speed, angle, time) {
    const rad = (angle * Math.PI) / 180;

    // Horizontal and vertical motion
    const u_x = speed * Math.cos(rad);
    const u_y = speed * Math.sin(rad);

    const x = cannonX + 50 + u_x * time;
    const y = cannonY - (u_y * time - 0.5 * gravity * time ** 2);

    return { x, y };
}

// Calculate Range and Height
function calculateStats(speed, angle) {
    const rad = (angle * Math.PI) / 180;

    const maxHeight = (speed ** 2 * Math.sin(rad) ** 2) / (2 * gravity);
    const range = (speed ** 2 * Math.sin(2 * rad)) / gravity;

    return { maxHeight, range };
}

// Shoot the Cannonball
function shoot(speed, angle) {
    let projectileX = cannonX + 50, projectileY = cannonY - 20;

    time = 0;

    const { maxHeight, range } = calculateStats(speed, angle);

    // Update initial stats
    speedDisplay.textContent = speed;
    angleDisplay.textContent = angle.toFixed(2);
    heightDisplay.textContent = maxHeight.toFixed(2);
    distanceDisplay.textContent = range.toFixed(2);

    interval = setInterval(() => {
        const { x, y } = calculatePosition(speed, angle, time);

        // Clear and redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCannon();
        drawTarget();
        drawCannonball(x, y);

        // Check for collision with target
        if (Math.abs(x - targetX) < 20 && Math.abs(y - targetY) < 20) {
            clearInterval(interval);
            alert("Hit the target!");
            resetGame();
        }

        // Stop if out of bounds
        if (y > canvas.height || x > canvas.width) {
            clearInterval(interval);
            alert("Missed! Try again.");
            resetGame();
        }

        // Update stats during motion
        const distance = x - (cannonX + 50);
        distanceDisplay.textContent = distance.toFixed(2);
        heightDisplay.textContent = (cannonY - y).toFixed(2);

        time += 0.05;
    }, 20);
}

// Event Listener for User Input
document.getElementById("submitBtn").addEventListener("click", () => {
    angle = parseFloat(document.getElementById("angleInput").value);

    if (isNaN(angle) || angle <= 0 || angle >= 90) {
        alert("Enter a valid angle (0-90 degrees).");
        return;
    }

    shoot(speed, angle);
});

// Reset Game
function resetGame() {
    targetX = Math.floor(Math.random() * 400) + 300;
    initGame();
}

// Initialize Game
function initGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCannon();
    drawTarget();
}

initGame();
