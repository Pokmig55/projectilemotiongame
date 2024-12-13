const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 9.8; // Acceleration due to gravity

// Cannon and Target
let cannonX = 100;
let cannonY = canvas.height - 20;
let targetX = Math.floor(Math.random() * 400) + 300;
let targetY = canvas.height - 20;

// Draw Cannon
function drawCannon() {
    ctx.fillStyle = "gray";
    ctx.fillRect(cannonX, cannonY - 20, 50, 20); // Cannon body
    ctx.beginPath();
    ctx.arc(cannonX + 25, cannonY, 10, 0, Math.PI * 2); // Cannon wheel
    ctx.fillStyle = "black";
    ctx.fill();
}

// Draw Target
function drawTarget() {
    ctx.beginPath();
    ctx.arc(targetX, targetY - 10, 20, 0, Math.PI * 2); // Target is a red circle
    ctx.fillStyle = "red";
    ctx.fill();
}

// Shoot Function
function shoot(speed, angle) {
    let time = 0;
    const rad = (angle * Math.PI) / 180; // Convert angle to radians

    const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawCannon();
        drawTarget();

        // Calculate projectile position
        const x = cannonX + 50 + speed * Math.cos(rad) * time;
        const y = cannonY - (speed * Math.sin(rad) * time - 0.5 * gravity * time ** 2);

        // Draw the projectile
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // Check for collision with the target
        if (Math.abs(x - targetX) < 20 && Math.abs(y - targetY + 10) < 20) {
            alert("Hit the target!");
            clearInterval(interval);
            resetGame(); // Reset the game on a hit
        }

        // Stop the projectile if it goes off-screen
        if (y > canvas.height || x > canvas.width) {
            alert("Missed! Try again.");
            clearInterval(interval);
        }

        time += 0.05; // Increment time for motion
    }, 20); // Frame interval (20ms for smooth animation)
}

// Reset Game
function resetGame() {
    targetX = Math.floor(Math.random() * 400) + 300;
    initGame();
}

// Initialize Game
function initGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawCannon();
    drawTarget();
}

// Start the game on load
initGame();

// Event listener for shooting
document.getElementById("shootButton").addEventListener("click", () => {
    const angle = parseFloat(document.getElementById("angleInput").value);
    const speed = parseFloat(document.getElementById("speedInput").value);

    if (isNaN(angle) || isNaN(speed)) {
        alert("Please enter valid speed and angle values.");
        return;
    }

    shoot(speed, angle);
});
