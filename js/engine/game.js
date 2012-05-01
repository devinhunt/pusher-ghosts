/**
 * Game.js
 * State and loop manager for mini-games
 */

(function() {
  var root = this;
  
  // Setup top level namespace
  var Game;
  Game = root.Game = {};
  Game.fps = 60;
  
  var timeNow,
      timeThen;
  
  /**
   * Update the simulation
   */
  Game.update = function() {
    
  };
  
  /**
   * Render our game objects to the screen
   */
  Game.draw = function() {
    
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
    timeNow = new Date().getTime();
    setInterval(Game.loopdeloop, 1000 / Game.fps)
  }
  
}).call(this);