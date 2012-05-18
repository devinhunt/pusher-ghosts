/**
 * Ping.js
 * The attack of our players
 */
(function() {
  var MAX_PING_SIZE = 100,
      PING_VELOCITY = 100;
      
  var Ping = Game.Ping = function(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.radius = 0;
    this.state = 'alive';
  }
  Ping.prototype = {
    update: function(dt) {
      if(this.state == 'alive') {
        this.radius += PING_VELOCITY * dt; 
        
        if(this.radius >= MAX_PING_SIZE) {
          this.radius = MAX_PING_SIZE;
          this.state = 'dead';
        }
      }
    },
    
    render: function() {
      
    }
  };
}).call(this);