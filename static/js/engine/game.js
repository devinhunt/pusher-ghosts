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
      Game.player.ping();
    }
    
    timeNow = new Date().getTime();
    var dt = (timeNow - timeThen) / 1000;
    
    for(var i in entities) {
      entities[i].update(dt);
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