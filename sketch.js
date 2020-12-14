 var spaceship, spaceshipImg;
//var beam;
var asteroid, asteroid2, asteroidImg1, asteroidImg2, asteroidImg3, asteroidImg4;
var bg, bgImg;
var PLAY, END, gameState;
var asteroidGroup, asteroid2Group, bulletsGroup;
var sound;
var score;
var restart, restartImg;
var bullet, bulletImg;
var e1, e2, e3, e4;
var SDestroySound, ADestroySound;
var exImg;




function preload(){
  spaceshipImg = loadImage("spaceship.png");
  asteroidImg1 = loadImage("aste1.png")
  asteroidImg2 = loadImage("aste2.png");
  asteroidImg3 = loadImage("aste3.png");
  asteroidImg4 = loadImage("aste4.png");
  bgImg = loadImage("bg3.jpg");
  restartImg = loadImage("restart.png");
  bulletImg = loadImage("bullet.png");
  //SDestroySound = loadSound("zapsplat_explosions_gas_boom_airy_designed_001_54857");
  ADestroySound = loadSound("Gun+357+Magnum.mp3");
  exImg = loadAnimation("pixlr-bg-result (8).png");
  //sound = loadSound("sound.html");
  

}

function setup() {
  createCanvas(600,550)
  bg = createSprite(300,275,600,400);
  bg.addImage(bgImg);
  bg.scale = 0.8;
  spaceship = createSprite(300,480,30,40);
  spaceship.x = width/2;
  spaceship.addImage("spaceship",spaceshipImg);
  spaceship.scale = 0.8;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  asteroidGroup = createGroup();
  asteroid2Group = createGroup();
  bulletsGroup = createGroup();
  spaceship.debug = true;
  spaceship.setCollider("circle",0,30,70);
  score = 0;
   restart = createSprite(300,200,30,30);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  e1 = createSprite(300,10,600,20);
  e2 = createSprite(10,200,20,800);
  e3 = createSprite(300,540,600,20);
  e4 = createSprite(590,200,20,800);
  spaceship.addAnimation("explosion",exImg);
  
 }

function draw() {
// background("pink");
  //createEdgesSprite(edges);
   //createEdgeSprites(edges);
//asteroidGroup.bounceOff(e1);
  asteroidGroup.bounceOff(e2);
//asteroidGroup.bounceOff(e3);
asteroidGroup.bounceOff(e4);

  
  
 if(gameState === PLAY)
   {
     //sound.loop();
     bg.velocityX = -4;
  restart.visible = false;
  
     
   if(bg.x < 90)
     {
       bg.x = width/2;
     }
  console.log(spaceship.x);
  
  if(keyDown("LEFT_ARROW") && spaceship.x > 96)
    {
      
    spaceship.x = spaceship.x - 6;
    }
  
  if(keyDown("RIGHT_ARROW") && spaceship.x < 505)
    {
      spaceship.x = spaceship.x + 6;
    }
  
  /*if(keyDown("UP_ARROW"))
    {
      spaceship.y = spaceship.y -6;
      
    }
  
  if(keyDown("DOWN_ARROW"))
    {
      spaceship.y = spaceship.y + 6;
    }*/
  
  spawnAsteroids();
     spawnBullets();
     
     if(keyDown("space"))
       {
         spawnBullets();
       }
     
  if(bulletsGroup.isTouching(asteroidGroup))
       {
         bulletsGroup.destroyEach();
         asteroidGroup.destroyEach();
         score = score + 3;
         ADestroySound.play();

         
       }
    
     /*if(bullet.isTouching(asteroidGroup))
       {
         bullet.destroy();
         asteroidGroup.destroyEach();
         
       }*/
     
     //if(asteroidGroup> 600 )
       //{
         //asteroidGroup.x = 300;
      // }
    //console.log(asteroidGroup.x);
     
  if(asteroidGroup.isTouching(spaceship))
    {
      gameState = END;
      ADestroySound.play()
      spaceship.changeAnimation("explosion",exImg);
      spaceship.scale = 0.39;
    }
  }
  
else if (gameState === END)  
  {
    asteroidGroup.setVelocityXEach(0);
    asteroidGroup.setVelocityYEach(0);
   // asteroid2Group.setVelocityXEach(0);
    bg.velocityX = 0;
    asteroidGroup.setLifetimeEach(-1);
    restart.visible = true;
    
    if(mousePressedOver(restart))
      {
        gameState = PLAY;
        score = 0;
        asteroidGroup.destroyEach();
        spaceship.x = 300;
        spaceship.y = 480;
        spaceship.changeAnimation("spaceship",spaceshipImg);
        spaceship.scale = 0.8;
      }
    
    
    
  }
  
  drawSprites();
  stroke("white");
  fill("pink");
  textSize(20);

  text("SCORE : " + score,450,60);
} 
 function spawnAsteroids()
  {
    if(frameCount % 30 === 0)
      {
        asteroid = createSprite(400,0,40,40);
        asteroid.x = Math.round(random(0,600));
        //asteroid.y = -100;
        asteroid.velocityY = 7;
        //asteroid.velocityX = (-5,-9);
         var r = Math.round(random(1,2));
        switch(r)
            {
              case 1 : asteroid.addImage(asteroidImg1);
                        asteroid.scale = 0.14;
                asteroid.setCollider("rectangle",150,40,590,150);
                 
                break;
                case 2 : asteroid.addImage(asteroidImg2);
                           asteroid.scale = 0.7;
                asteroid.setCollider("circle",0,0,40)
                break;
                default : break;
            }
        
        if(asteroid.x <= 300)
          {
            asteroid.velocityX = 10;
          }
        
        if(asteroid.x >=301)
          {
            asteroid.velocityX = -10;
          }
       
        asteroid.lifetime = 200;
        //asteroid.debug = true;
        
        asteroidGroup.add(asteroid);
      }
  

 
}
  
  
  
  
  
  
  //createEdgeSprites();
        //asteroid.bounceOff(edges);
       
         /*switch(asteroid.x)
          {
              
            case 1 : asteroid.x = 0;
              asteroid.velocityX = 6;
              break;
            case 2 : asteroid.x = 600; 
              asteroid.velocityX = -6;
              break;
              default : break;
              
          }*/
//asteroid.velocityX = -4;
        
        //asteroid.y = Math.round(random(40,469));
        
        
       
        
          
     
        
        /*if(frameCount % 70 === 0)
          {
        asteroid2 = createSprite(600,350,30,30);
        //asteroid2.velocityX = -6;
        
        asteroid2.x = Math.round(random(0,600));
        
        if(asteroid2.x <= 300)
          {
            asteroid2.velocityX = 6;
          }
        
        if(asteroid2.x >=301)
          {
            asteroid2.velocityX = -6;
          }
        
        asteroid2.y = Math.round(random(470,530));
            asteroid2.addImage(asteroidImg3);
            asteroid2.scale = 0.45;
          
        
   var rn = Math.round(random(1,2));
    switch(rn)
      {
          
        case 1 : asteroid2.addImage(asteroidImg3);
          asteroid2.setCollider("circle",0,0,40);
          break;
          case 2 : asteroid2.addImage(asteroidImg2);
          asteroid2.scale = 0.7;
           asteroid2.setCollider("circle",0,0,90);
          break;
          default: break;
      }
    
            asteroid.lifetime = 100;
             asteroid2Group.add(asteroid2);
            asteroid2.debug = true;
            
            
            
            
            
            
          }*/
     
      
  function spawnBullets()
{
  if(keyDown("space") && frameCount % 9===0)
    {
      bullet = createSprite(300,200,8,20);
       bulletsGroup.add(bullet);
     
      bullet.addImage(bulletImg);
      bullet.scale = 0.04;
      bullet.x = spaceship.x;
      bullet.y = spaceship.y - 45;
      bullet.velocityY = -7;
      //bullet = 140;
     // bullet.debug = true;
      
      
       
    }
  
  
  
  
  
}
      
      
      
      
      
      
      
      
    
    
    
    
    
    
    
    
    
    
  
 
