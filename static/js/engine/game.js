/**
 * Game.js
 * State and loop manager for mini-games
 */

(function() {
  var root = this;
  
  // Setup top level namespace and defaults
  var Game;
  Game = root.Game = {};
  Game.fps = 30;
  Game.frameTime = 1000 / Game.fps;
  var ghosts = Game.ghosts = [];
  var pings = Game.pings = [];
  
  var timeNow,
      timeThen;
  
  /**
   * Update the simulation
   */
  Game.update = function() {
    Game.Input.update();
    Game.player.targetX = Game.Input.mouseX;
    Game.player.targetY = Game.Input.mouseY;
    
    // -- FOR LACK OF A BETTER SPOT, ATM
    if(Game.Input.clicked && Game.player.isBooCharged) {
      Game.player.isBooCharged = false;
      var ping = new Game.Ping({
        x: Game.player.x,
        y: Game.player.y,
        owner: Game.player
      });
      
      this.pings.push(ping);
      
      // post it up?
      var playerState = Game.player.getState();
      playerState.ping = true;
      playerState.pingX = Math.floor(ping.x);
      playerState.pingY = Math.floor(ping.y);
      
      $.post('/', playerState);
    }
    // --
    
    timeNow = new Date().getTime();
    var dt = (timeNow - timeThen) / 1000;
    
    for(var p in pings) {
      if(pings[p].state == 'dead') {
        delete pings[p];
        pings.splice(i, p);
        p --;
      } else {
        pings[p].update(dt);
      }
    }
    
    var ping, ghost, dist;
    for(var i in ghosts) {
      ghost = ghosts[i];
      
      if(ghosts[i].state == 'dead') {
        delete ghost;
        ghosts.splice(i, 1);
        i --;
      } else {
        ghost.update(dt);
        
        for(var a in pings) {
          ping = pings[a];
          
          if(ping.owner.id != ghost.id) {
            dist = Math.sqrt((ping.x - ghost.x) * (ping.x - ghost.x) + (ping.y - ghost.y) * (ping.y - ghost.y));
            if(dist <= ping.radius + ghost.health) {
              ping.owner.setHealth(ping.owner.health + 1);
              ghost.setHealth(ghost.health - 1);
            }
          }
        }
      }
    }
    
    timeThen = timeNow;
  };
  
  /**
   * Render our game objects to the screen
   */
  Game.render = function() {
    Game.ctx.save();
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
    
    for(var p in pings) {
      pings[p].render();
    }
    
    for(var i in ghosts) {
      ghosts[i].render();
    }
    
    Game.ctx.restore();
  };
  
  /**
   * Main loop for the entire game, game state and objects
   * get updated from this method.
   */
  Game.loopdeloop = function() {
    Game.update();
    Game.render();
  };
  
  /**
   * Start the game simulation
   */
  Game.run = function() {
    timeThen = new Date().getTime();
    Game.Input.initialize();
    setInterval(Game.loopdeloop, 1000 / Game.fps)
  }
  
  
  // -- Helper functions
  
  Game.dist = function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }
  
}).call(this);