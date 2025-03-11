class game {
  constructor() {
    this.numItems = 10;
    this.bugArray = [];
    this.score = 0;
    // No need to store score in this class anymore
    
    for (let i = 0; i < this.numItems; i++) {
      this.bugArray[i] = new ladybug();
      this.bugArray[i].x = random(100, 750);
      this.bugArray[i].y = random(-300, -100);
      this.bugArray[i].speed = random(3, 5);
      this.bugArray[i].size = 50; // The ladybug's size for collision
    }
  }

  display() {
    background(bg2); // background for the game
    image(Tscore, 300, 24, 202, 82); // Display score background
    this.displayScore(); // Display the score

    for (let i = 0; i < this.numItems; i++) {
      let ladybug = this.bugArray[i];

      // Move ladybug downward
      ladybug.y += ladybug.speed;

      // Check for collision with player
      if (this.ladybugTouches(ladybug, knight)) {
        score++; // Use the global score here
        this.resetLadybug(ladybug); // Reset ladybug position
      }

      // Reset if ladybug falls past screen
      if (ladybug.y > height) {
        this.resetLadybug(ladybug); // Reset ladybug position
      }

      // Display the ladybug
      ladybug.display();
    }
  }

  resetLadybug(ladybug) {
    ladybug.y = random(-300, -100); // Reset vertical position above the screen
    ladybug.x = random(100, 750);  // Reset horizontal position within bounds
  }

  ladybugTouches(ladybug, player) {
    const ladybugBox = ladybug.getCollisionBox(); // Get the ladybug's bounding box

    // Check if the player's bounding box overlaps with the ladybug's bounding box
    return (
      ladybugBox.x + ladybugBox.width > player.x &&        // Right edge of ladybug
      ladybugBox.x < player.x + player.width &&             // Left edge of player
      ladybugBox.y + ladybugBox.height > player.y &&        // Bottom edge of ladybug
      ladybugBox.y < player.y + player.height              // Top edge of player
    );
  }

  displayScore() {
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(score, 400, 90); // Display the score at the top
  }
}
