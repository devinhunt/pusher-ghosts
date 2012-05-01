/*
 * gameobject.js
 * Simulatable, drawable things in our game.
 */

(function() {  
  /**
   * The basic thing that makes up games: the things we simulate and draw
   */
  Game.Entity = function() {
    this.initialize();
  };
  
  Game.Entity.prototype = {
    
    /** Position in the world */
    x: 0,
    y: 0,
    
    /**
     * Called when the object is created
     */
    initialize: function() {
      
    },
    
    /**
     * Update this game object
     */
    update: function(dt) {
      
    },
    
    /**
     * Draw this object to the screen
     */
    render: function() {
      
    }
    
  };
  
}).call(this);