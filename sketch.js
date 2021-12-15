
var trex ,trex_running,clouds,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameoverImage,gameover

var ground,groundImage,invisibleGround,cloudImage,obstacle,r,score,obstaclesGroup,cloudsGroup,restartImage,restart

var PLAY=1

var END=0

var gameState=PLAY

function preload(){

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")

  groundImage=loadImage("ground2.png")

  cloudImage=loadImage("cloud.png")

  gameoverImage=loadImage("gameOver.png")

  restartImage=loadImage("restart.png")

  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  
}

function setup(){

  createCanvas(600,200)

  trex=createSprite(50,130,20,50)
  trex.addAnimation("running",trex_running)
  trex.scale=0.5

  gameover=createSprite(300,100)
  gameover.addImage(gameoverImage)
  gameover.scale=0.5

  restart=createSprite(300,140)
  restart.addImage(restartImage)
  restart.scale=0.5


  ground=createSprite(200,180,400,20)
  ground.addImage("moving",groundImage)
  ground.velocityX=-4

  invisibleGround=createSprite(200,190,400,10)
  invisibleGround.visible=false
  score =0

  obstaclesGroup=new Group()

  cloudsGroup=new Group()
 // console.log("score"+a)
  
}

function draw(){

  background("white")

  text("score "+score,500,50)

  if(gameState==PLAY){

    score=score+Math.round(frameCount/60)
    gameover.visible=false
    restart.visible=false

    ground.veloctyX=-4
    if(ground.x<0){
      ground.x=ground.width/2
    } 

    if(keyWentDown("space") && trex.y>=100){
      trex.velocityY=-10
    }
  
    trex.velocityY=trex.velocityY+0.8 

    spawnClouds()
  
  
     spawnObstacles()

     if(obstaclesGroup.isTouching(trex)){
       gameState=END
     }
  }

  else if(gameState==END){
  ground.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  gameover.visible=true
  restart.visible=true
  }
  
  trex.collide(invisibleGround)

  
  drawSprites()

}

function spawnClouds(){

if(frameCount%60==0){
  clouds=createSprite(600,100,40,10)
  clouds.velocityX=-3
  clouds.lifetime=200
  clouds.addImage(cloudImage)
  clouds.scale=0.4
  clouds.y=Math.round(random(10,120))
  clouds.depth=trex.depth
  trex.depth=trex.depth+1
  cloudsGroup.add(clouds)
}

}

function spawnObstacles(){
  if(frameCount%60==0){
    obstacle=createSprite(600,165,10,40)
    obstacle.velocityX=-6
    r=Math.round(random(1,6))
    switch(r){
      case 1:obstacle.addImage(obstacle1)
      break
      case 2:obstacle.addImage(obstacle2)
      break
      case 3:obstacle.addImage(obstacle3)
      break
      case 4:obstacle.addImage(obstacle4)
      break
      case 5:obstacle.addImage(obstacle5)
      break
      case 6:obstacle.addImage(obstacle6)
      break
      default:break

  
    }
    obstacle.scale=0.5
    obstaclesGroup.add(obstacle)


  }


}

