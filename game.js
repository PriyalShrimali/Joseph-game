class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    cat = createSprite(200, displayHeight / 2 - 100, 50, 50)
    cat.scale = 0.3
    mouse = createSprite(displayWidth / 2 - 300, 100, 30, 30)
    mouse.scale = 0.3
    cat.addImage("cat", catimage)
    mouse.addImage("mouse", mouseimage)
    cars = [cat, mouse];
    cat.debug = true;
    mouse.debug = true;
    cat.setCollider("rectangle", 200, 0, 1000, 1000)
   // player.updateFirst();
  }

  play() {

    form.hide();
    image(Stadium, 0, 0, displayWidth, displayHeight);
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background(rgb(198, 135, 103));
      image(Stadium, 0, 0, displayWidth, displayHeight);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y;
      var min= 30;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].x;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].y;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if (index === player.index) {
              fill("red");
          }
        else{
          fill("black");
        }
        
       
        min+=130;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].health, min, 20);

       
      }

      if(allPlayers.player1.health===100 || allPlayers.player2.health===100){

        if(allPlayers.player1.health===100){
       game.end(allPlayers.player1.name,1,allPlayers.player2.name);
      }
      else{
        game.end(allPlayers.player2.name,2,allPlayers.player1.name);
      }
    }

    }

    if(player.index===1){
      fill("red");
        text("Press 'F' to  attack the mouse, "+player.name,600,50);
    }
    else{
      fill("red");
      text("Press 'D' to  attack the cat, "+player.name,600,50);
    }

    //F
    if (keyIsDown(70) && cat.isTouching(mouse) && player.index === 1) {
      //cat.addImage("cat", catattack)
      player.health += 20;
      player.x = 100;
      player.y = 200;
      player.update();
    }
    //D
    if (keyIsDown(68) && mouse.isTouching(cat) && player.index === 2) {
      //mouse.addImage("mouse", mouseattack)
      player.health += 20;
      player.x = displayWidth - 120;
      player.y = 200;
      player.update()
    }
    
    
     
    
    

    if (keyIsDown(UP_ARROW)) {
      player.y -= 5;
      player.update();
    }

   

    if (keyIsDown(LEFT_ARROW)) {
      player.x -= 5
      player.update()
    }

    if (keyIsDown(DOWN_ARROW)) {
      player.y += 5
      player.update()
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player.x += 5
      player.update()
    }

    drawSprites();
  }
  end(name,val, loserName) {
    console.log(val);
    if(val===1){
      clear();
      cat.remove();
      mouse.remove();
      if(player.index===1){
      image(milk,0,0,displayWidth-20,displayHeight-170)
      image(catwin,displayWidth/2-100,displayHeight/2-250,400,400);
      fill("blue");
      textSize(20)
      text("You have defeated your arch rival, you champ!!",displayWidth/2-100,100);
      text("Congratulations, "+name+"!",displayWidth/2,125);
    }
    else{
      image(milk,0,0,displayWidth-20,displayHeight-170)
      image(catwin,displayWidth/2-100,displayHeight/2-250,400,400);
      fill("blue");
      textSize(20)
      text("You lost, but you played so well!!",displayWidth/2-100,100);
      text("Better Luck next time, "+loserName+"!",displayWidth/2,125);
    }
    }
    else{
      clear();
      cat.remove();
      mouse.remove();
      if(player.index===2){
      image(cheese,0,0,displayWidth-20,displayHeight-170)
      image(mousewin,displayWidth/2-100,displayHeight/2-250,400,400);
      fill("blue");
      textSize(20)
      text("You have defeated your arch rival, you champ!!",displayWidth/2-100,100);
      text("Congratulations, "+name+"!",displayWidth/2,125);
      }
      else{
        image(cheese,0,0,displayWidth-20,displayHeight-170)
      image(mousewin,displayWidth/2-100,displayHeight/2-250,400,400);
      fill("blue");
      textSize(20)
      text("You lost, but you played so well!!",displayWidth/2-100,100);
      text("Better Luck next time, "+loserName+"!",displayWidth/2,125);
      }
    }
    
   
  }
}