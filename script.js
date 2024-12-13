const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 9.8; // Acceleration due to gravity

// Calculate Range and Height
function calculateStats(speed, angle) {
    const rad = (angle * Math.PI) / 180; // Convert angle to radians
    const maxHeight = (speed ** 2 * Math.sin(rad) ** 2) / (2 * gravity); // Max height formula
    const range = (speed ** 2 * Math.sin(2 * rad)) / gravity; // Range formula

    return { maxHeight, range };
}

// Cannon and Target
let cannonX = 100;
let cannonY = canvas.height - 20;
let targetX = Math.floor(Math.random() * 400) + 300;
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
    ctx.arc(targetX, targetY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// Shoot Function
function shoot(speed, angle) {
    let time = 0;
    const interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        drawCannon();
        drawTarget();

        const rad = (angle * Math.PI) / 180; // Convert angle to radians
        const x = cannonX + 50 + speed * Math.cos(rad) * time; // Horizontal position
        const y = cannonY - (speed * Math.sin(rad) * time - 0.5 * gravity * time ** 2); // Vertical position

        // Draw the projectile
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        // Check for collision with the target
        if (Math.abs(x - targetX) < 20 && Math.abs(y - targetY) < 20) {
            alert("Hit the target!");
            clearInterval(interval);
            resetGame();
        }

        // Stop if the projectile goes off-screen
        if (y > canvas.height || x > canvas.width) {
            alert("Missed! Try again.");
            clearInterval(interval);
        }

        time += 0.05; // Increment time
    }, 20);
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

// Call the initGame function when the script is loaded
initGame();

// Example of calling the shoot function
document.getElementById("shootButton").addEventListener("click", () => {
    const angle = parseFloat(document.getElementById("angleInput").value);
    const speed = parseFloat(document.getElementById("speedInput").value);
    if (isNaN(angle) || isNaN(speed)) {
        alert("Please enter valid speed and angle.");
        return;
    }
    shoot(speed, angle);
});
