var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

/*
        PONG + AI
        To make pong, you will need a player paddle, a ball, and an AI paddle
        Player paddle should have input left/right

        Ball should have collisions for sides and both enemy paddle and player paddle

        AI should be able to calculate where the ball lands and head to said position
*/

// PLAYER VARIABLES
var playerX = canvas.width/2
var playerY = canvas.height - 20;
var playerSpeed = 5;
var playerWidth = 25;

var playerLeft = false;
var playerRight = false;

// INPUT CHECKER
function keyDownHandler(a) {
  if(a.key == "Right" || a.key == "ArrowRight"){
    playerRight = true;
  }
  else if (a.key =="Left"||a.key =="ArrowLeft"){
    playerLeft = true;
  }
}

function keyUpHandler(a) {
  if(a.key == "Right" || a.key == "ArrowRight"){
    playerRight = false;
  }
  else if (a.key =="Left"||a.key =="ArrowLeft"){
    playerLeft = false;
  }
}

// STEP EVENT FOR PLAYER
function stepPlayer(){
    if(playerLeft == true && playerX - playerWidth - playerSpeed > 0){
      playerX -= playerSpeed;
    } else if (playerRight == true && playerX + playerWidth + playerSpeed < canvas.width){
      playerX += playerSpeed;
    }
}

// DRAWING THE PLAYER
function drawPlayer(){
  ctx.beginPath();
  ctx.rect(playerX, playerY, playerWidth,5);
  ctx.rect(playerX, playerY, -playerWidth,5);
  ctx.fillStyle = "#00000";
  ctx.fill();
  ctx.closePath();
}

//ENEMY VARIABLES
var enemyX = canvas.width/2;
var enemyY = 20;
var enemySpeed = 4;
var enemyWidth = 25;

var enemyMTX = enemyX;

var enemyLeft = false;
var enemyRight = false;

//STEP EVENT FOR ENEMY
function stepEnemy(){
  if(Math.abs(enemyMTX-enemyX)>enemySpeed){
    AIMTW();
  }
}
//AI THINK EVENT FOR ENEMY
function AIThink(){

  //TIME IT TAKES BEFORE BALL COVERS VERTICAL DIST TO REACH ENEMY (CYCLES)
  var t = Math.abs(enemyY - ballY)/ballSpeedY;

  // TOTAL DISTANCE TRAVELLED (x) BASED ON TIME (CYCLES)
  var d = Math.abs(t * ballSpeedX) + Math.sign(ballSpeedX)* ballX;

  // DISTANCE FROM THE SIDE
  var f = (d%canvas.width);

  // IF THE BALL WILL BOUNCE AN EVEN AMOUNT OF TIME,
  // IT WILL APPROACH FROM THE SAME DIRETCION IT IS HEADING RIGHT NOW
  // OTHERWISE IF IT BOUNCS AN ODD AMOUNT OF TIME,
  // IT WILL APPROACH FROM THE OPPOSITE DIRETCION IT IS HEADING FROM NOW
  if(Math.floor(d/canvas.width)%2==0){
    enemyMTX = f;
  } else {
    enemyMTX = canvas.width-f;//-enemyWidth;
  }

}
//AI MOVE TOWARDS
function AIMTW(){
  if(enemyMTX<enemyX && enemyX - enemyWidth - enemySpeed > 0){
    enemyX -= enemySpeed;
  } else if (enemyMTX>enemyX && enemyX + enemyWidth + enemySpeed < canvas.width){
    enemyX += enemySpeed;
  }
}
//DRAW EVENT FOR ENEMY
function drawEnemy(){
  ctx.beginPath();
  ctx.rect(enemyX, enemyY, enemyWidth,5);
  ctx.rect(enemyX, enemyY, -enemyWidth,5);
  ctx.fillStyle = "#00000";
  ctx.fill();
  ctx.closePath();
}

// BALL VARIABLES
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballRadius = 10;
var r = Math.random() < 0.5 ? -1 : 1;
var ballSpeedX = r*Math.floor((Math.random() * 3) + 1);
var ballSpeedY = 5;

// STEP EVENT FOR THE Ball
function stepBall(){
  // HORIZONTAL BOUNCE
  if(ballX + ballRadius + ballSpeedX > canvas.width || ballX - ballRadius + ballSpeedX < 0){
    ballSpeedX = -ballSpeedX;
  }
  ballX += ballSpeedX;

  // IF BOUNCING OFF PLAYER'S SIDE (BARELY MISSED)
  if(ballY+ballRadius > playerY
  &&  Math.abs(ballX + Math.sign(ballSpeedX)*ballRadius + ballSpeedX - playerX) < playerWidth + ballRadius){
    ballSpeedX = -ballSpeedX;
  }

  // IF BOUNCING DIRETCLY OFF PLAYER'S PAD (HIT)
  if(Math.abs(ballY + ballRadius + ballSpeedY - playerY) == 0  && Math.abs(ballX  - playerX) < playerWidth + ballRadius){
    ballSpeedY = -ballSpeedY;
    AIThink();
  }

  // IF BOUNCING OFF ENEMY'S PAD (HIT)
  if(Math.abs(ballY - ballRadius + ballSpeedY - enemyY) == 0  && Math.abs(ballX  - enemyX) < enemyWidth + ballRadius){
    ballSpeedY = -ballSpeedY;
  }
  ballY += ballSpeedY;
}
// DRAWING THE BALL
function drawBall(){
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2 );
  ctx.fillStyle = "#00000";
  ctx.fill();
  ctx.closePath();
}

// DRAWING EVERYTHING
function draw(){
  // IF START OR MENU
  if(start){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    stepPlayer();
    drawPlayer();
    stepEnemy();
    drawEnemy();
    stepBall();
    drawBall();
  } else {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawMenu();

    if(playerLeft || playerRight)
    {start = true;}
  }
}

// MENU TO START
function drawMenu(){
  ctx.font = "30px Comic Sans MS";
  ctx.fillText("Press left or right key to start!", 30,30)
}

// STARTING THE GAME
setInterval(draw,15);

var start = false;
