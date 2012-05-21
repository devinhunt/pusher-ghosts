/**
 * Pusher Ghosts
 * A simple multiplayer gave that shows off the abilities of web-sockets and
 * real time messaging
 */

(function() {
    
  var root = this,
      lastPushedState,
      PUSHER_APP_KEY = '22bc0fb0343194de2f30',
      pusher = new Pusher(PUSHER_APP_KEY),
      channel = pusher.subscribe('ghost_game');
  
  /**
   * Someone has left the party
   */
  channel.bind('player_leave', function(data) {
    
  });
  
  /**
   * Someone in the party has moved, done something
   */
  channel.bind('player_state', function(states) {
    var entity,
        target, 
        data;
    
    for(var s in states) {
      data = states[s];
      
      if(Game.player.id != data.playerId) {
        for(var p in Game.ghosts) {
          entity = Game.ghosts[p];
          if(entity.id == data.playerId) target = entity;
        }
      
        if(! target) {
          target = new Game.Ghost({
            id: data.playerId
          });
          Game.ghosts.push(target);
        }
      
        target.updateFromState(data);
      
        if(data.ping) {
          var ping = new Game.Ping({
            x: target.pingX,
            y: target.pingY,
            owner: target
          });
          Game.pings.push(ping);
        }
      }
    }
  });
  
  // Send out continous state updates, if they're new
  setInterval(function() {
    if(! Game.player.stateEquals(lastPushedState)) {
      lastPushedState = Game.player.getState();
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
  Game.ghosts.push(Game.player);
  lastPushedState = Game.player.getState();
  Game.run();
  
}).call(this);