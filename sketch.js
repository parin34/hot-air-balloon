var database, position;
var backImg;
var balloon;

function preload() {
  backImg = loadImage("Hot Air Ballon-01.png")
  bimg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}
function setup() {

  database = firebase.database();
  createCanvas(1600, 800);

  balloon = createSprite(250, 250, 30, 30);
  balloon.shapeColor = "green";
  balloon.addAnimation("img",bimg);
balloon.scale = 0.8;
  database.ref("Balloon/position").on("value", readposition, showerr)
}

function draw() {

  background(backImg);

  if (keyDown(LEFT_ARROW)) {
    writePosition(-2, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(2, 0);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +2)
    balloon.scale = balloon.scale + 0.005;
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -2);
balloon.scale = balloon.scale - 0.005;
  }

  drawSprites()

}
function writePosition(x, y) {
  database.ref("Balloon/position").set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readposition(data) {
  position = data.val();
  balloon.x = position.x
  balloon.y = position.y
}
function showerr() {
  console.log("error")
}
