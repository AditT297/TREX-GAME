var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud_image, cloudGroup;
var ob1, ob2, ob3, ob4, ob5, ob6, obstacleGroup;
var gameState, PLAY, END;
var count;
var gameOver,restart,gameOver_image,restart_image;

function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloud_image = loadImage("cloud.png");
  groundImage = loadImage("ground2.png")
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameOver_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
 

  invisibleGround = createSprite(200, 185, 400, 10);
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();

  //initiate Game STATEs
   PLAY = 1;
   END = 0;
   gameState = PLAY;
   count = 0;

  gameOver = createSprite(250,100);
  gameOver.scale=0.5;
  restart = createSprite(250,150);
  restart.scale=0.5;
  
  gameOver.addImage(gameOver_image);
  restart.addImage(restart_image);
  
  
  
    restart.visible=false;
    gameOver.visible=false;
}

function draw() {
  background(180);

  
  
  text("Score: " + count, 500, 50);
  trex.collide(invisibleGround);

  if (gameState === PLAY) {

    
     ground.velocityX = -(5 + count/100 * 3);
    
    if (keyDown("space") && trex.y>156) {
      trex.velocityY = -15;
    }

    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if((frameCount % 5 === 0)){
     count++; 
    }

    spawnClouds();
    spawnObstacles();



    if (obstacleGroup.collide(trex)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityYEach(0);
    cloudGroup.setVelocityYEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    obstacleGroup.collide(invisibleGround);
    trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
    reset();
  }
  }
  drawSprites();
}

function reset(){
gameState=PLAY;
trex.changeAnimation("running",trex_running);
gameOver.visible=false;
restart.visible=false;
count=0;
obstacleGroup.destroyEach();
cloudGroup.destroyEach();
ground.velocityX=-(5 + count/100 * 3)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 140));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -(3 + count/100 * 3)

    //to add the clouds to the group
    cloudGroup.add(cloud);

    //assign lifetime to the variable
    cloud.lifetime = 234;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 160, 10, 40);
    obstacle.velocityX = -(6 + count/100 * 3)

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1:
        obstacle.addImage(ob1);
        break;
      case 2:
        obstacle.addImage(ob2);
        break;
      case 3:
        obstacle.addImage(ob3);
        break;
      case 4:
        obstacle.addImage(ob4);
        break;
      case 5:
        obstacle.addImage(ob5);
        break;
      case 6:
        obstacle.addImage(ob6);
        break;
      default:
        break;
    }

      obstacleGroup.add(obstacle);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
  }
}