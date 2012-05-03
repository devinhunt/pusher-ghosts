/**
 * Ghost.js
 * Our main player token
 */
(function() {
  var Ghost = Game.Ghost = function(options) {
    this.initialize(options);
  };
  Ghost.prototype = {
    playerId: null,
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    maxStep: 500, 
    
    
    /**
     * Initialize the ghost
     */
    initialize: function(options) {
      this.playerId = options;
      this.x = options.x || 0;
      this.y = options.y || 0;
      
      this.el = document.createElement('div');
      this.el.className = 'ghost';
    },
 
    update: function() {
      this.x += (Game.Input.mouseX - this.x) / 5; 
      this.y += (Game.Input.mouseY - this.y) / 5; 
    },
 
    render: function() {
      $(this.el).css({
        left: this.x - this.width / 2, 
        top: this.y  - this.height / 2
      });
    }
  };
}).call(this);