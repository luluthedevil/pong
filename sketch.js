let xBall = 300;
let yBall = 200;
let diameter = 25;
let raio = diameter / 2;

let velocitXBall = 5;
let velocitYBall = 5;

let xPosRect = 10;
let yPosRect = 150;

let xRect = 10;
let yRect = 90;

let xPosRectOponent = 575;
let yPosRectOponent = 150;
let velocityYOponent;

let colided = false;

let myPoints = 0;
let oponentPoints = 0;

let raquetada;
let ponto;

function preload(){
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  showBall();
  ballMotion();
  verifyCorner();
  showRect(xPosRect, yPosRect);
  showRect(xPosRectOponent, yPosRectOponent);
  moveMyRect();
  //verifyColision(xPosRect, yPosRect);
  //verifyColision(xPosRectOponent, yPosRectOponent);
  colisionRectLibrary(xPosRect, yPosRect);
  colisionRectLibrary(xPosRectOponent, yPosRectOponent);
  moveOponentRect();
  scoreBoard();
  scorePoints();
}

function showBall(){
  circle(xBall,yBall, diameter);
}

function ballMotion(){
  xBall = xBall + velocitXBall;
  yBall = yBall + velocitYBall;
}

function verifyCorner(){
  if(xBall + raio > width || xBall - raio < 0){
    velocitXBall = velocitXBall * (-1);
  }
  if(yBall + raio > height || yBall - raio < 0){
    velocitYBall = velocitYBall * (-1);
  }
}

function showRect(x, y){
  rect(x, y, xRect, yRect);
}

function moveMyRect(){
  if(keyIsDown(UP_ARROW)){
     yPosRect = yPosRect - 10;
  }
  if(keyIsDown(DOWN_ARROW)){
     yPosRect = yPosRect + 10;
  }
}

function verifyColision(x, y){
  if(xBall - raio < xRect + x && yBall - raio < yRect + y && yBall + raio < yRect + y){
    velocitXBall = velocitXBall * (-1);
  }
}

function colisionRectLibrary(x, y){
  colided = collideRectCircle(x, y, xRect, yRect, xBall, yBall, raio);
  if(colided ){
    velocitXBall = velocitXBall * (-1);
    raquetada.play();
  }
}

function moveOponentRect(){
  velocityYOponent = yBall - yPosRectOponent - raio / 2 - 100;
  yPosRectOponent = yPosRectOponent + velocityYOponent;
}

function scoreBoard(){
  stroke(255);
  textSize(18);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(myPoints, 150, 26);
  fill(color(255, 140, 0));
  rect(460, 10, 40, 20);
  fill(255);
  text(oponentPoints, 480, 26);
}

function scorePoints(){
  if(xBall + raio > 598){
    myPoints = myPoints + 1;
    ponto.play();
  }
  if(xBall - raio < 2){
    oponentPoints = oponentPoints + 1;
    ponto.play();
  }
}