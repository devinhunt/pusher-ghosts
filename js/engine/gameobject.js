/*
 * gameobject.js
 * Simulatable, drawable things in our game.
 */

(function() {
  var root = this;
  
  /**
   * The basic thing that makes up games: the things we simulate and draw
   */
  Game.Object = function() {
  
  };
  
  Game.Object.prototype = {
    
    /**
     * Update this game object
     */
    update: function(dt) {
      
    },
    
    /**
     * Draw this object to the screen
     */
    draw: function() {
      
    }
    
  };
  
}).call(this);