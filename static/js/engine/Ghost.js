/**
 * Ghost.js
 * Our main player token
 */
(function() {
  var MAX_A = 100,
      SPRING_FORCE = 1000,
      DAMP = .5,
      MAX_HEALTH = 100,
      MAX_RADIUS = 50,
      MIN_RADIUS = 2,
      BOO_RECHARGE_TIME = .5;
  
  var Ghost = Game.Ghost = function(options) {
    this.initialize(options);
  };
  Ghost.prototype = {
    state: 'moving',
    id: null,
    
    // Ghost Motion
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    
    // Ghost State
    health: 50,
    isBooCharged: true,
    rechargeTime: 0,
    
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
 
    update: function(dt) {
      var theta = Math.atan2(this.targetY - this.y, this.targetX - this.x),
          dist = Game.dist(this.targetX, this.targetY, this.x, this.y),
          solutionTime = .3,
          ax,
          ay;
      
      // boo charging?
      if(! this.isBooCharged) {
        this.rechargeTime += dt;
        
        if(this.rechargeTime >= BOO_RECHARGE_TIME) {
          this.isBooCharged = true;
          this.rechargeTime = 0;
        }
      }
      
      ax = (2 * (this.targetX - this.x - this.vx * solutionTime)) / (solutionTime * solutionTime);
      ay = (2 * (this.targetY - this.y - this.vy * solutionTime)) / (solutionTime * solutionTime);
      
      this.vx += ax * dt;
      this.vy += ay * dt;
  
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    },
 
    render: function() {
      var radius = this._getHitRadius(),
          booRadius;

      // Head
      Game.ctx.fillStyle = "rgba(255, 0, 255, .8)";
      Game.ctx.beginPath();
      Game.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
      Game.ctx.closePath();
      Game.ctx.fill();
      
      // Recharge Meter
      if(this.isBooCharged) {
        booRadius = radius - 4;
      } else {
        booRadius = this.rechargeTime / BOO_RECHARGE_TIME * (radius - 4);
      }
      
      Game.ctx.fillStyle = "rgba(0, 255, 255, 1)";
      Game.ctx.beginPath();
      Game.ctx.arc(this.x, this.y, booRadius, 0, Math.PI * 2, true);
      Game.ctx.closePath();
      Game.ctx.fill();
    },
    
    _getHitRadius: function() {
      return ((this.health / MAX_HEALTH) * (MAX_RADIUS - MIN_RADIUS)) + MIN_RADIUS;
    }
  };
}).call(this);