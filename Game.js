class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    text("Press Up key to run, Down Arrow to Jump!", 200, displayHeight-10);

    car1 = createSprite(50,200);
    car1.addImage("carOne", car1Image);
    car2 = createSprite(300,200);
    car2.addImage("carTwo", car2Image);
    car3 = createSprite(550,200);
    car3.addImage("carThree", car3Image);
    car4 = createSprite(800,200);
    car4.addImage("carFour", car4Image);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      background("#c68767");

      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;
         x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.x = player.x + 20;
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.x +=30
      player.update();
    }

    if (player.x = 500){
      isTouching();
    }
  
    if(player.distance > 4250){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    console.log("Game Ended!");
    game.update(2);
  }

}
