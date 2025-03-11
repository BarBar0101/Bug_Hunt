var bugHunt;
var desc;

var restartButton;
var replayButton;

var bg;
var bug;
var knight;
var Tscore;
var bg2;
var loseS;
var winS;

var header;
var desc;
var guide;
var guide2;

var music;

var sceneGame;
var sceneIntro;
var currentScene;
var timer;
var ladybuggame;
var youlose;

var sceneId = 0;

var score = 0;

function preload() {
  bugHunt = loadFont("NetHunt.ttf");
  desc = loadFont("eElectroBox.ttf");

  bg = loadImage("Bug_Huntbg.png");
  bug = loadImage("Bug_Hunt_Front.png");
  Knight = loadImage("knight.png");
  Tscore = loadImage("Bug_Hunt_score.png");
  bg2 = loadImage("bug_hunt_game_bg.png");
  loseS= loadImage("Bug_Hunt_lose.png");
  winS = loadImage("Bug_Hunt_win.png");

  music = loadSound("bgmusic.ogg");
}

function setup() {
  createCanvas(800, 800);

  timer = new Timer(50)
  ladybuggame = new game();
  youlose = new losescreen();
  sceneIntro = new intro();
  sceneIntro.setImage("Bug_Hunt_Front.png");

  // Create the game scene instance
  sceneGame = new game();

  // Set current scene to intro screen
  currentScene = "intro";

  // Play button position
  restartButton = new button(width / 2, height / 2 + 275); 
  restartButton.setImage("Bug_Hunt_button.png");

  // Add the listener for the button to transition the scene
  restartButton.addListener(startBtnPressed); // This function sets sceneId to 1

  knight = new player(Knight, 100, 120, 120, 100); // Player initialization

  // Start background music if not playing
  if (!music.isPlaying()) {
    music.loop();
  }

  sceneGame = new game();
}

function draw() {
  if (sceneId === 0) {
    showstartscreen();
    restartButton.draw(); // Draw the start button
  } else if (sceneId === 1) {
    if (!timer.isRunning) {
      timer.start(); // Start the timer
    }

    timer.update(); // Update the timer
    sceneGame.display(knight); // Display the game
    knight.display(); // Display the knight
    timer.display(); // Display the timer

    if (timer.isFinished) {
      sceneId = 2; // If the timer finishes, go to the lose screen
    }
  } else if (sceneId === 2) {
    youlose.display(); // Display the lose screen
  }
}


function showstartscreen() {
  background(255);
  image(bug, 0, 0, 800, 800);  // Display background image for the intro screen
  restartButton.enable();  // Enable the play button
  restartButton.draw();    // Draw the play button
}


function startBtnPressed() {
  sceneId = 1;  // This will transition the scene to the game
  restartButton.disable();  // Disable the play button to avoid multiple clicks
}

function restartTimer() {
  startBtnPressed();
}
