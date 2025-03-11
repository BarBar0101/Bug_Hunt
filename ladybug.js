class ladybug {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;

    this.speed = random(1, 10);

    this.bodyColor = "#22223b";
    this.wingColor = "#c70d00";

    this.arc1 = 300;
    this.rColors = [
      "#F4F1DE",
      "#004F2D",
      "#D87CAC",
      "#3F88C5",
      "#FFDA22",
      "#C589E8",
      "#4C191B",
      "#F40076",
      "#B8E0D2",
      "#95B8D1",
    ];
    this.cColors = random(this.rColors);
    this.tternshapes = "circle"; // Only "circle" will be used

    this.patternpositions = [
      { x: 85, y: 70, size: random(5, 15) }, // Reduced size for circle
      { x: 75, y: 85, size: random(5, 15) }, // Reduced size for circle
      { x: 60, y: 100, size: random(5, 15) }, // Reduced size for circle
      { x: 60, y: 115, size: random(5, 15) }, // Reduced size for circle
    ];

    this.width = 150; // Width of the ladybug image (adjust accordingly)
    this.height = 150; // Height of the ladybug image (adjust accordingly)
  }

  display() {
    push();
    noStroke();

    // Move to the ladybug's position
    translate(this.x, this.y);

    // Rotate by 180 degrees (PI radians)
    rotate(PI);

    // Offset for drawing the ladybug
    var offsetX = -105; // Adjust offset for smaller ladybug
    var offsetY = -100; // Adjust offset for smaller ladybug

    translate(offsetX, offsetY);

    // Head
    fill(this.bodyColor);
    arc(100, 70, 35, 35, PI, 0, CHORD); // Reduced size for head
    triangle(92, 35, 90, 35, 95, 55); // Adjusted triangle size for head
    triangle(105, 35, 107, 35, 102, 55); // Adjusted triangle size for head

    // Wing 1
    fill(this.wingColor);
    arc(85, 100, 75, 75, (2 * PI) / 3, (5 * PI) / 3, CHORD); // Reduced wing size

    // Wing 2
    fill(this.wingColor);
    arc(115, 100, 75, 75, (4 * PI) / 3, PI / 3, CHORD); // Reduced wing size

    // Body
    fill(this.bodyColor);
    triangle(100, 87, 93, 112, 107, 112); // Adjusted body size
    triangle(107, 112, 93, 112, 100, 137); // Adjusted body size

    // Draw pattern circles
    fill(this.cColors);
    for (var pos of this.patternpositions) {
        ellipse(pos.x, pos.y, pos.size, pos.size); // Draw smaller circle with random size
        ellipse(200 - pos.x, pos.y, pos.size, pos.size); // Draw mirrored circle
    }

    pop();
  }

  // Add a method to get the collision box of the ladybug
  getCollisionBox() {
    // The collision box is around the ladybug's drawn area, using width and height
    return {
      x: this.x - this.width / 2, // Adjust position for the left side
      y: this.y - this.height / 2, // Adjust position for the top side
      width: this.width,
      height: this.height
    };
  }
}
