const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 9.8;

// Cannon and Target
let cannonX = 100, cannonY = canvas.height - 50;
let targetX = Math.floor(Math.random() * 400) + 300; // Target position
let targetY = canvas.height - 20;

// User Input Variables
let speed = 50; // Initial speed
let angle; // User's input for angle
let time = 0; // Timer for projectile motion
let interval;

// Draw Cannon
function drawCannon() {
    ctx.fillStyle = "gray";
    ctx.fillRect(cannonX, cannonY - 20, 50, 20); // Barrel
    ctx.beginPath();
    ctx.arc(cannonX + 25, cannonY, 10, 0, Math.PI * 2); // Wheels
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

    const x = cannonX + 50 + u_x * time; // Horizontal displacement
    const y = cannonY - (u_y * time - 0.5 * gravity * time ** 2); // Vertical displacement

    return { x, y };
}

// Shoot the Cannonball
function shoot(speed, angle) {
    let projectileX = cannonX + 50, projectileY = cannonY - 20;

    time = 0;

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
        }

        // Stop if out of bounds
        if (y > canvas.height || x > canvas.width) {
            clearInterval(interval);
            alert("Missed! Try again.");
        }

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

// Initialize Game
function initGame() {
    drawCannon();
    drawTarget();
}

initGame();
