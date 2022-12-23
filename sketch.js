//step #1 define vars
var bg, bgImg;
var player, shooterImg1, shooterImg2, shooterImg3;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 100;

var gameState = "fight";



// step #2 load images
function preload(){
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  shooterImg1 = loadImage("assets/shooter_1.png");
  shooterImg2 = loadImage("assets/shooter_2.png");
  shooterImg3 = loadImage("assets/shooter_3.png");

  zombieImg = loadImage("assets/zombie.png");

  bgImg = loadImage("assets/bg.jpeg");
}


function setup(){

//step #3 add canvas
  createCanvas(windowWidth, windowHeight);

//step #4 add bg
  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1

//step #5 create sprites and pics
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg1);
  player.scale = 0.3
  player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4

//step #6 make groups
  bulletGroup = new Group();
  zombieGroup = new Group();
}

function draw(){
  background(0);

  if(gameState === "fight"){
    //step #7 add movements
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y=player.y-30;
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y=player.y+30;
    }
    if(keyWentDown("space")){
      bullet = createSprite(displayWidth-1150, player.y-30, 20, 10);
      bullet.velocityX = 20;

      bulletGroup.add(bullet);
      player.depth = bullet.depth;
      player.depth = player.depth - 2;
      player.addImage(shooterImg3);
      bullets -= 1;
    }
    else if(keyWentUp("space")){
      player.addImage(shooterImg1);
    }
  }

  if(bullets==0){
    gameState = "bullet";
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup[i].destroy();
      }
    }
  }

  if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length;i++){
      zombieGroup[i].destroy();
    }
  }
  enemy();

  drawSprites();

  if(gameState === "lost"){
    textSize(100);
    fill("red");
    text("You lost!", 470, 410);

    zombieGroup.destroyEach();
    player.destroy();
  }
  else if(gameState === "win"){
    textSize(100)
    fill("yellow");
    text("You win!", 470, 410);

    zombieGroup.destroyEach();
    player.destroy();
  }
  else if(gameState === "bullet"){
    textSize(100);
    fill("red");
    text("You ran out of bullets!", 470, 410);

    zombieGroup.destroyEach();
    player.destroy();
  }
}

function enemy(){
  if(frameCount%50===0){
    zombie = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zombie.addImage(zombieImg);
    
    zombie.scale = 0.15;

    zombie.velocityX = -3;

    zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 400, 400);
    
    zombie.lifetime = 400;

    zombieGroup.add(zombie);
  }
}