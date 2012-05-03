/**
 * Ghost.js
 * Our main player token
 */
(function() {
  var Ghost = Game.Ghost = function(options) {
    this.initialize(options);
  };
  Ghost.prototype = {
    id: null,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    width: 60,
    height: 60,
    maxStep: 500, 
    
    /**
     * Initialize the ghost
     */
    initialize: function(options) {
      this.id = options.id;
      this.x = options.x || 0;
      this.y = options.y || 0;
      this.targetX = this.x;
      this.targetY = this.y;
      
      this.el = document.createElement('div');
      this.el.className = 'ghost';
    },
 
    update: function() {
      
      this.x += (this.targetX - this.x) / 5; 
      this.y += (this.targetY - this.y) / 5; 
      // if(this.id != 0) {
      //   console.log(this.targetX, this.targetY, this.x, this.y);
      // }
    },
 
    render: function() {
      $(this.el).css({
        left: this.x - this.width / 2, 
        top: this.y  - this.height / 2
      });
    }
  };
}).call(this);