var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
//var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var track, car1Image, car2Image, car3Image, car4Image, personFall;

function preload(){
  track = loadImage("../images/track.jpg");
  car1Image = loadImage("../images/car1.png");
  car2Image = loadImage("../images/car2.jpeg");
  car3Image = loadImage("../images/car3.png");
  car4Image = loadImage("../images/car4.png");
  personFall = loadImage("../images/fall.jpeg");
  ground = loadImage("../images/ground.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 // database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  var obstacle1 = createSprite(200,500,3000,30);
  var obstacle2 = createSprite(200,800,3000,30);
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }

  if(car1.x > 30){
    car1.x = 5000;
  }
}

function keyPressed(){
  if(keyCode === 32){
     cars.velocityY = -2;
  }

  function isTouching(){
    player.addImage(personFall);
  }
}


