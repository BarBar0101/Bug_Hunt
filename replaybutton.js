class replaybutton {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 100;
    this.image = null;
    this.scale = 0.5; // Default scale
    this.listeners = [];
    this.isPressed = false;
    this.isEnabled = true;
    this.opacity = 255;

    // Add event listeners
    this.addEventListeners();
  }

  async setImage(imagePath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const p5Img = createImage(img.width, img.height);
        p5Img.drawingContext.drawImage(img, 0, 0);
        this.image = p5Img;
        this.width = img.width * this.scale;
        this.height = img.height * this.scale;
        resolve();
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  isMouseOver() {
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + (this.width / 2) * this.scale &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + (this.height / 2) * this.scale
    );
  }

  handlePress() {
    if (this.isEnabled && this.isMouseOver()) {
      this.isPressed = true;
      this.scale = 0.9; // Reduce scale when pressed
    }
  }

  handleRelease() {
    if (this.isEnabled && this.isPressed) {
      this.isPressed = false;
      this.scale = 1; // Reset scale after release
      if (this.isMouseOver()) {
        this.dispatch();
      }
    }
  }

  dispatch() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    if (this.image) {
      tint(255, this.opacity);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
    } else {
      rectMode(CENTER);
      fill(255, this.opacity);
      rect(0, 0, this.width, this.height);
    }
    pop();
  }

  enable() {
    this.isEnabled = true;
    this.opacity = 255;
    this.scale = 0.5; // Reset scale when enabling the button
    this.addEventListeners();
  }

  disable() {
    this.isEnabled = false;
    this.opacity = 100; // 90% opacity
    this.removeEventListeners();
  }

  addEventListeners() {
    this.handlePress = this.handlePress.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
    window.addEventListener("mousedown", this.handlePress);
    window.addEventListener("mouseup", this.handleRelease);
    window.addEventListener("touchstart", this.handlePress);
    window.addEventListener("touchend", this.handleRelease);
  }

  removeEventListeners() {
    window.removeEventListener("mousedown", this.handlePress);
    window.removeEventListener("mouseup", this.handleRelease);
    window.removeEventListener("touchstart", this.handlePress);
    window.removeEventListener("touchend", this.handleRelease);
  }
}
