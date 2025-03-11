class losescreen {
  constructor() {
    this.restartBtn = new replaybutton(400, 700); // Position of the button
    this.restartBtn.setImage("replay_button.png"); // Set the image for the button

    // Button should be disabled initially
    this.restartBtn.disable();
     this.restartBtn.addListener(() => {
      this.restartGame(); // Call the function to restart the game
    });
  }

  display() {
    background(0);

    //console.log("Displaying loseScreen. Current Score: ", score);  // Log the global score

    // Check the global score and display the win or lose screen
    if (score >= 50) {
      image(winS, 0, 0, width, height); // Display win screen
    } else {
      image(loseS, 0, 0, width, height); // Display lose screen
    }

    // Enable and display the replay button after game over
    this.restartBtn.enable();
    this.restartBtn.draw(); // Draw the button
  }

  restartGame() {
    score = 0;  // Reset the global score to 0
    ladybuggame = new game(); // Reset game logic
    timer = new Timer(30); // Reset the timer
    sceneId = 0; // Set the scene back to intro
    this.restartBtn.disable(); // Disable the button again
}
}
