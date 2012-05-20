/**
 * Ghost.js
 * Our main player token
 */
(function() {
  var MAX_A = 100,
      SPRING_FORCE = 1000,
      DAMP = .5;
  
  var Ghost = Game.Ghost = function(options) {
    this.initialize(options);
  };
  Ghost.prototype = {
    state: 'moving',
    id: null,
    vx: 0,
    vy: 0,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    width: 25,
    
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
          solutionTime = .4,
          ax,
          ay;
      
      ax = (2 * (this.targetX - this.x - this.vx * solutionTime)) / (solutionTime * solutionTime);
      ay = (2 * (this.targetY - this.y - this.vy * solutionTime)) / (solutionTime * solutionTime);
      
      this.vx += ax * dt;
      this.vy += ay * dt;
  
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    },
 
    render: function() {
      Game.ctx.fillStyle = "rgba(255, 0, 255, .8)";
      Game.ctx.beginPath();
      Game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, true);
      Game.ctx.closePath();
      Game.ctx.fill();
    },
  };
}).call(this);