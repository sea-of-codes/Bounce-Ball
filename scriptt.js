document.addEventListener("DOMContentLoaded", function() {
    const bat = document.getElementById("bat");
    const ball = document.getElementById("ball");
    const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");
    const replayBtn = document.getElementById("replay-btn");
  
    let batX = 250;
    let ballX = 250;
    let ballY = 10;
    let ballSpeedX = 3;
    let ballSpeedY = 3;
    let score = 0;
    let gameOver = false;
    let animationId = null; // Track requestAnimationFrame
  
    // Timer variables
    let startTime = Date.now();
    const speedIncreaseInterval = 10000; // Increase speed every 10 seconds
  
    // Function to move the bat smoothly
    function moveBat(e) {
      const rect = gameContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      batX = mouseX - bat.offsetWidth / 2;
      batX = Math.max(0, Math.min(batX, gameContainer.offsetWidth - bat.offsetWidth));
      bat.style.left = batX + "px";
    }
  
    // Function to move the ball and handle collisions
    function moveBall() {
      if (!gameOver) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
  
        // Check if ball hits the bottom (Game Over)
        if (ballY + ball.offsetHeight >= gameContainer.offsetHeight) {
          gameOver = true;
          cancelAnimationFrame(animationId); // Stop animation
          replayBtn.style.display = "block";
          alert("Game Over! Your score: " + score);
        }
  
        // Ball hits left or right wall
        if (ballX < 0 || ballX > gameContainer.offsetWidth - ball.offsetWidth) {
          ballSpeedX *= -1;
        }
  
        // Ball hits the top
        if (ballY < 0) {
          ballSpeedY *= -1;
        }
  
        // Ball hits the bat
        if (
          ballY + ball.offsetHeight >= bat.offsetTop &&
          ballX + ball.offsetWidth >= bat.offsetLeft &&
          ballX <= bat.offsetLeft + bat.offsetWidth
        ) {
          ballSpeedY *= -1;
          score += 5;
          scoreDisplay.textContent = "Score: " + score;
        }
  
        // Update ball position
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";
      }
    }
  
    // Function to increase ball speed periodically
    function increaseBallSpeed() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
  
      if (elapsedTime >= speedIncreaseInterval) {
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
        startTime = currentTime;
      }
    }
  
    // Function to restart the game
    function restartGame() {
      gameOver = false;
      score = 0;
      ballX = 250;
      ballY = 10;
      ballSpeedX = 3;
      ballSpeedY = 3;
      scoreDisplay.textContent = "Score: 0";
      replayBtn.style.display = "none";
      startTime = Date.now();
      gameLoop(); // Start game loop again
    }
  
    // Main game loop to move ball and increase speed
    function gameLoop() {
      moveBall();
      increaseBallSpeed();
      if (!gameOver) {
        animationId = requestAnimationFrame(gameLoop); // Keep animating
      }
    }
  
    // Event listener for mouse movement to control bat
    gameContainer.addEventListener("mousemove", moveBat);
  
    // Replay button click listener
    replayBtn.addEventListener("click", restartGame);
  
    // Start the game loop initially
    gameLoop();
  });
  