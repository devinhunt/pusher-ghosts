/**
 * Input.js
 * Handels and normalizes user input so our game can get it.
 * TODO :: This doesn't need to be a class. 
 */

(function() {
  Game.Input = {
    
    initialize: function() {
      $(window).mousemove(_.bind(this._onMouseMove, this));
      $(window).click(_.bind(this._onMouseMove, this));
    },
    
    /** Mouse position, synced to frame update */
    mouseX: 0,
    mouseY: 0,
    
    /** Internal storage the the current mouse position */  
    _currentMouseX: 0,
    _currentMouseY: 0,
    
    /**
     * Update the state of the input for this frame
     */
    update: function() {
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
      this.mouseX = this._currentMouseX;
      this.mouseY = this._currentMouseY;
    },
    
    /**
     * Capute mouse motions
     */
    _onMouseMove: function(event) {
      this._currentMouseX = event.pageX || event.clientX;
      this._currentMouseY = event.pageY || event.clientY;
    }
  };
}).call(this);