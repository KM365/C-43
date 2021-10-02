var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,obstacle;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana=loadImage("banana.png");
  obstacle=loadImage("stone.png")
}
function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player.setCollider("rectangle", 0, 0, player.width, player.height);
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup = createGroup();
  obGroup = createGroup();
}



function draw() { 
  background(0);


  if(gameState===PLAY){
    
    console.log("GameSate=PLAY");
    console.log("score : "+score);
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();

      player.scale += +0.007;
      score= score+1;
    }
    
    if(frameCount % 80 === 0){
      player.scale -= -0.0009
    }

    if(obGroup.isTouching(player)){
      obGroup.destroyEach();
      
      gameState=END;
    }

    if(score>100){
      winprotocol();
      gameState=END;
    }
    if(keyDown("c")){
      player.scale=100;
      score= 1000000;
    }

    spawnfood();
    spawnob();
   if(gameState===PLAY){
     if(backgr.x<100){
    backgr.x=backgr.width/2;
    }
   }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    drawSprites();

  }

  if(gameState===END){
    backgr.velocityX=0
   player.visible=false;
    console.log("GameSate=END");
   text("Score"+":"+score,700,120);
   textSize(30);
   fill(255);
   text("Game Over",400,200);
   text("Press CRTL+R to play again",300,300);
  }

  

  
}

function spawnfood () {
  if (frameCount % 80 === 0) {
    var food = createSprite(600, 250, 40, 10);
    food.y = random(120,200);
    food.velocityX = -(6);

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch (rand) {
      case 1:
        food.addImage(banana);
        break;
      case 2:
        food.addImage(banana);
        break;
      default:
        break;
      
    }

    //assign scale and lifetime to the obstacle           
    food.scale = 0.05;
    food.lifetime = 300;
    //food.debug=true;
    //add each obstacle to the group
    foodGroup.add(food);
  } 
}

function spawnob () {
  if (frameCount % 120 === 0) {
    var ob = createSprite(765, 330, 10, 40);
    ob.velocityX = -(6);

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch (rand) {
      case 1:
        ob.addImage(obstacle);
        break;
      case 2:
        ob.addImage(obstacle);
        break;
      default:
        break;
      
    }

    //assign scale and lifetime to the obstacle           
    ob.scale = 0.3;
    ob.lifetime = 300;
    ob.debug=true;
    ob.setCollider("rectangle", -25, 0, 250 ,250);
    //add each obstacle to the group
    obGroup.add(ob);
  }
}


function winprotocol(){
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  console.log("U just got rickrolled lmao");
  
}
