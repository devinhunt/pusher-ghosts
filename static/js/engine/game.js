/**
 * Game.js
 * State and loop manager for mini-games
 */

(function() {
  var root = this;
  
  // Setup top level namespace and defaults
  var Game;
  Game = root.Game = {};
  Game.fps = 30;
  Game.frameTime = 1000 / Game.fps;
  var entities = Game.entities = [];
  
  var timeNow,
      timeThen;
  
  /**
   * Update the simulation
   */
  Game.update = function() {
    Game.Input.update();
    Game.player.targetX = Game.Input.mouseX;
    Game.player.targetY = Game.Input.mouseY;
    
    if(Game.Input.clicked) {
      var ping = new Game.Ping({
        x: Game.player.x,
        y: Game.player.y,
        owner: Game.player,
      });
      
      this.entities.push(ping);
      
      // post it up?
      $.post('/', {
        ping: true, 
        x: Game.Input.mouseX,
        y: Game.Input.mouseY
      });
    }
    
    timeNow = new Date().getTime();
    var dt = (timeNow - timeThen) / 1000;
    
    for(var i in entities) {
      
      if(entities[i].state == 'dead') {
        delete entities[i];
        entities.splice(i, 1);
        i --;
      } else {
        entities[i].update(dt);
      }
    }
    
    timeThen = timeNow;
  };
  
  /**
   * Render our game objects to the screen
   */
  Game.render = function() {
    Game.ctx.save();
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    
    for(var i in entities) {
      entities[i].render();
    }
    
    Game.ctx.restore();
  };
  
  /**
   * Main loop for the entire game, game state and objects
   * get updated from this method.
   */
  Game.loopdeloop = function() {
    Game.update();
    Game.render();
  };
  
  /**
   * Start the game simulation
   */
  Game.run = function() {
    timeThen = new Date().getTime();
    Game.Input.initialize();
    setInterval(Game.loopdeloop, 1000 / Game.fps)
  }
  
}).call(this);