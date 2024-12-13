
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gravity = 9.81;

// Cannon and Target
let cannonX = 100, cannonY = canvas.height - 00;
let targetX = Math.floor(Math.random() * 400) + 300;
let targetY = canvas.height - 20;
let round = 1;
let score = 0;

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
    const range = ( (1/2) * 2 * (speed * Math.cos(rad)) * time;

    return { maxHeight, range };
}



// User Input Variables
let speed; // User' input for speed
let angle; // User's input for angle
let time = 0; // Timer for projectile motion
let interval;

// HTML Elements for Display
const speedDisplay = document.getElementById("speedDisplay");
const angleDisplay = document.getElementById("angleDisplay");
const distanceDisplay = document.getElementById("distanceDisplay");
const heightDisplay = document.getElementById("heightDisplay");
const roundDisplay = document.getElementById("roundDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

// Shoot the Cannonball
function shoot(speed, angle) {
    let projectileX = cannonX, projectileY = cannonY;

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

//ROUND SYSTEM
function handleRound() {
    if (round === 1) {
        // Round 1: System provides speed, player guesses angle
        // Fixed Data for Round 1
        speed = 18.3; 
        distance = 30 ;
        height 1.37 ;
        alert("Round 1: Guess the angle to hit the target!");
    } else if (round === 2) {
        // Round 2: System provides angle, player guesses speed
        // Provided Data for Round 2
        angle = 35 ;
        distance = 21.55 ;
        height = println (" ??? ") 
        alert("Round 2: Guess the speed to hit the target!");
    } else {
        alert("Game Over! Final Score: " + score);
        resetGame();
    }
}

// Check input and validate
function validateInput() {
    if (round === 1) {
        // Player enters angle in Round 1
        const userAngle = parseFloat(document.getElementById("angleInput").value);
        if (Math.abs(userAngle - angle) <= 35) {
            score++;
            alert("Correct! Proceeding to the next round.");
        } else {
            alert("Incorrect! Try again.");
        }
    } else if (round === 2) {
        // Player enters speed in Round 2
        const userSpeed = parseFloat(document.getElementById("angleInput").value); // Reuse input box
        if (Math.abs(userSpeed - speed) <= 15) {
            score++;
            alert("Correct! Proceeding to the next round.");
        } else {
            alert("Incorrect! Try again.");
        }
    }
    scoreDisplay.textContent = score;
    round++;
    roundDisplay.textContent = round;
    handleRound();
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
myUndefinedFunction();
initGame();


