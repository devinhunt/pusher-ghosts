/**
 * Pusher Ghosts
 * A simple multiplayer gave that shows off the abilities of web-sockets and
 * real time messaging
 */

(function() {
    
  var root = this,
      PUSHER_APP_KEY = '22bc0fb0343194de2f30';
  
  // DEBUGGY SETUP CODE
  // Add a player
  var player = new Game.Ghost();
  document.body.appendChild(player.el);
  
  Game.entities.push(player);
  
}).call(this);