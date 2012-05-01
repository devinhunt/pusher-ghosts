/**
 * Input.js
 * Handels and normalizes user input so our game can get it.
 */

(function() {
  Game.Input = function() {
    this.initialize();
    console.log('Hello');
  };
  Game.Input.prototype = {
    
    /** Mouse position, synced to frame update */
    mouseX: 0,
    mouseY: 0,
    
    /** Internal storage the the current mouse position */  
    _currentMouseX: 0,
    _currentMouseY: 0,
    
    initialize: function() {
      $(window).mousemove(_.bind(this._onMouseMove, this));
    },
    
    update: function() {
      this.mouseX = this._currentMouseX;
      this.mouseY = this._currentMouseY;
    },
    
    /**
     * Capute mouse motions
     */
    _onMouseMove: function(event) {
      this._currentMouseX = event.pageX;
      this._currentMouseY = event.pageY;
    }
  };
}).call(this);