var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

setInterval(draw, 15);
setInterval(counter, 1000);

var x = 50;
var y = 50;

var ballRadius = 10;
var ballSpeedX = 2;
var ballSpeedY = 0.5;

var time = 0;
var score = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
// INPUT CODE
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

// DRAWING CODE
var boxWidth = 50;
function drawBox(){
  ctx.beginPath();
  ctx.rect(x,y,boxWidth,boxWidth);
  ctx.fillStyle = "#66ff99";
  ctx.fill();
  ctx.closePath();

  x += ballSpeedX;
  y += ballSpeedY;

  if( (x + 50 + ballSpeedX > canvas.width) || (x + ballSpeedX < 0) ){
    ballSpeedX = -ballSpeedX;
  }

  if( (y + 50 + ballSpeedY > canvas.height) || (y + ballSpeedY < 0) ){
    ballSpeedY = -ballSpeedY;
  }
}

var px = canvas.width/2;
var py = 100;
var playerWidth = 10;
var playerSpeed = 5;

function drawPlayer(){
  ctx.beginPath();
  ctx.rect(px,py,playerWidth, playerWidth);
  ctx.fillStyle = "#66ff99";
  ctx.fill();
  ctx.closePath();
}

function movePlayer(){
  if(rightPressed && ( px < canvas.width - playerWidth)){
    px += playerSpeed;
  }
  else if(leftPressed && ( px > 0)){
    px -= playerSpeed;
  }
  if(upPressed && ( py > 0)){
    py -= playerSpeed;
  }
  else if(downPressed && ( py < canvas.height - playerWidth)){
    py += playerSpeed;
  }
}

function playerBlockCol(){
  if(   Math.abs(px - x) < boxWidth
    &&  Math.abs(py - y) < boxWidth)
    {score = -10;}
}

function drawText(){
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(time, 40, 40);
  ctx.fillText(score, canvas.width/2 , 40)
}

function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  playerBlockCol();
  drawBox();
  drawPlayer();
  movePlayer();
  drawText();
}

function counter(){
  time +=1;
}
