var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

setInterval(draw, 15);
setInterval(counter, 1000);

var x = 50;
var y = 50;

var ballRadius = 10;
var ballSpeedX = 2;
var ballSpeedY = 0.5;

var time = 0;
var score = 0;
// DRAWING CODE
function drawBox(){
  ctx.beginPath();
  ctx.rect(x,y,50,50);
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

function drawText(){
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(time, 40, 40);
  ctx.fillText(score, canvas.width/2 , 40)
}

function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBox();
  drawText();
}

function counter(){
  time +=1;
}
