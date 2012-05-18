/**
 * Pusher Ghosts
 * A simple multiplayer gave that shows off the abilities of web-sockets and
 * real time messaging
 */

(function() {
    
  var root = this,
      PUSHER_APP_KEY = '22bc0fb0343194de2f30';
  
  var pusher = new Pusher(PUSHER_APP_KEY);
  var channel = pusher.subscribe('ghost_input');
  var lastPushedState = {
    x: Game.Input.mouseX,
    y: Game.Input.mouseY,
  };
  
  /**
   * Someone has left the party
   */
  channel.bind('player_leave', function(data) {
    
  });
  
  /**
   * Someone in the party has moved, done something
   */
  channel.bind('player_input', function(data) {
    var entity,
        target;

    if(Game.player.playerId != data.playerId) {
      for(var p in Game.entities) {
        entity = Game.entities[p];
        if(entity.id == data.playerId) target = entity;
      }
      
      if(! target) {
        target = new Game.Ghost({
          id: data.playerId, 
          x: data.x, 
          y: data.y
        });
        Game.entities.push(target);
      }
      
      target.targetX = data.x;
      target.targetY = data.y;
    }
  });
  
  // Send out our input state
  setInterval(function() {
    
    if(Game.Input.mouseX != lastPushedState.x || Game.Input.mouseY != lastPushedState.y) {
      lastPushedState.x =  Game.Input.mouseX;
      lastPushedState.y =  Game.Input.mouseY;
      
      $.post('/', lastPushedState);
    }
  }, 100);
  
  // Rendering stuff
  Game.canvas = document.getElementById('ghost-game');
  $(Game.canvas).attr("width", $(window).width());
  $(Game.canvas).attr("height", $(window).height());
  Game.ctx = Game.canvas.getContext('2d');
  
  // Our player
  Game.player = new Game.Ghost({id: window.PLAYER_ID, x: 0, y: 0});
  Game.entities.push(Game.player);
  
  Game.run();
  
}).call(this);