/**
 * Ping.js
 * The attack of our players
 */
(function() {
  var MAX_PING_SIZE = 100,
      PING_VELOCITY = 200;
      
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
      var alpha = Math.max(.1, (MAX_PING_SIZE - this.radius) / MAX_PING_SIZE);
      Game.ctx.fillStyle = "rgba(0, 255, 255, " + alpha + ")";
      Game.ctx.beginPath();
      Game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      Game.ctx.closePath();
      Game.ctx.fill();
    }
  };
}).call(this);