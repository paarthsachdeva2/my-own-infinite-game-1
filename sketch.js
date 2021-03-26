var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup
var background1,backgroundImage
var canvas

function preload(){

  monkey_running =loadAnimation("Images/Monkey_01.png","Images/Monkey_02.png","Images/Monkey_03.png");
  bananaImage = loadImage("Images/banana.png");
  obstaceImage = loadImage("Images/stone.png");
  backgroundImage=loadImage("Images/jungle.jpg");
}

function setup(){
  
  var canvas=createCanvas(800,400);
  background1= createSprite(0,0,800,400);
  background1.addImage(backgroundImage);
  background1.velocityX=-3;
  background1.scale=1.5;
  background1.x=background1.width/2;
  
  ground=createSprite(2000,350,900,10);
  ground.x = ground.width /2;
 
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
   bananaGroup=createGroup();
   obstaclesGroup = createGroup();
  
}

function draw() {

   if(ground.x<0){
    ground.x = ground.width/2;
      }
  
     if(background1.x<0){
       background1.x=background1.width/2;
     }
  if(gameState===PLAY){
     ground.velocityX=-4;
    
    
     if(keyDown("space")&& monkey.y>=100) {
        monkey.velocityY = -10;
    }
     
    monkey.velocityY=monkey.velocityY+0.8;
    
    spawnBanana();
    spawnObstacle();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
     
    }
    
   
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
     
    }
  if(gameState===END){
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    background1.velocityX=0;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  }
  
  monkey.collide(ground);
  
  drawSprites();
 
  
}

function spawnBanana(){
  if(World.frameCount % 80 === 0){
    banana=createSprite(350,250,10,10); 
    banana.y= random(120,200);
    banana.velocityX= -4;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=200;
    bananaGroup.add(banana)
  
 }
}

function spawnObstacle(){
  if(World.frameCount % 110 === 0 ){
    obstacle=createSprite(350,330,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX= -4;
    obstacle.scale=0.1;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
  }
}




















