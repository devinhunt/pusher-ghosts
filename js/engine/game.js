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
  
  var timeNow,
      timeThen,
      entities = [];
  
  /**
   * Update the simulation
   */
  Game.update = function() {
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
  Game.draw = function() {
    for(var i in entities) {
      entities[i].draw();
    }
  };
  
  /**
   * Main loop for the entire game, game state and objects
   * get updated from this method.
   */
  Game.loopdeloop = function() {
    Game.update();
    Game.draw();
  };
  
  /**
   * Start the game simulation
   */
  Game.run = function() {
    timeThen = new Date().getTime();
    setInterval(Game.loopdeloop, 1000 / Game.fps)
  }
  
}).call(this);