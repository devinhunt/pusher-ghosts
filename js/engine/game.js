/**
 * Game.js
 * State and loop manager for mini-games
 */

(function() {
  var root = this;
  
  // Setup top level namespace
  var Game;
  Game = root.Game = {};
  
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
  
}).call(this);