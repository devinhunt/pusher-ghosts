/**
 * Pusher Ghosts
 * A simple multiplayer gave that shows off the abilities of web-sockets and
 * real time messaging
 */

(function() {
    
  var root = this,
      PUSHER_APP_KEY = '22bc0fb0343194de2f30';
  
  /**
   * The player and his enemys in PusherGhosts
   */
  var Ghost = root.Ghost = function() {
    this.initialize();
  };
  root = _.extend(Ghost.prototype, Game.Entity.prototype, {
    acceleration: 10,
    velocityX: 0,
    velocityY: 0,
    maxVelocity: 100,
    
    /**
     * Initialize the ghost
     */
    initialize: function() {
      this.el = document.createElement('div');
      this.el.className = 'ghost';
    },
    
    update: function(dt) {
      var dx = Game.input.mouseX - this.x,
          dy = Game.input.mouseY - this.y,
          theta = Math.atan2(dy, dx);
      console.log(dx, dy, theta);
      this.velocityX += this.acceleration * Math.cos(theta) * dt;
      this.velocityY += this.acceleration * Math.sin(theta) * dt;
      
      this.x += this.velocityX;
      this.y += this.velocityY;
    },
    
    render: function(dt) {
      $(this.el).css({
        left: this.x, 
        top: this.y
      });
    }
    
  });
  
  // DEBUGGY SETUP CODE
  // Add a player
  var player = new Ghost();
  document.body.appendChild(player.el);
  
  Game.entities.push(player);
  
}).call(this);