class player {
  constructor(_img, _x, _y, _w, _h) {
    this.x = _x;
    this.y = _y + 500;
    this.width = _w;
    this.height = _h;
    this.speed = 10;
    this.image = _img;
    this.dir = 1;
    this.keys = {
      ArrowRight: false,
      ArrowLeft: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.enable();
  }

  enable() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = true;
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = false;
      event.preventDefault();
    }
  }

  update() {
    if (this.keys.ArrowRight) {
      this.x += this.speed;
      //this.dir = 1;
    }
    if (this.keys.ArrowLeft) {
      this.x -= this.speed;
      //this.dir = -1; // Flip direction when moving left
    }
  }

  display() {
    this.update();
    
    push();
    // Use the player's position correctly in the translate
    translate(this.x, this.y);
    //scale(this.dir, 1);
    image(this.image, 0, 0, this.width, this.height); // Use (0, 0) because we've already translated

    // Debugging to see if hitbox was accurate or not: Draw a bounding box around the player (match position with image)
    /*noFill();
    stroke(255, 0, 0); // Red bounding box for debugging
    rect(0, 0, this.width, this.height); // This will be positioned at (0, 0) relative to the translated player position
*/
    pop();
  }
}
