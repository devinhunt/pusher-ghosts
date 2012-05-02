/**
 * Pusher Ghosts
 * A simple multiplayer gave that shows off the abilities of web-sockets and
 * real time messaging
 */

(function() {
    
  var root = this,
      PUSHER_APP_KEY = '22bc0fb0343194de2f30';
      
  // Setup Messeging
  // Pusher.log = function(message) {
  //   if (window.console && window.console.log) window.console.log(message);
  // };
  
  var pusher = new Pusher(PUSHER_APP_KEY);
  var channel = pusher.subscribe('ghost_input');
  var lastPushedState = {
    x: Game.Input.mouseX,
    y: Game.Input.mouseY,
  };
  
  //channel.bind('player_input', function(data) {
  //  console.log(data);
  //});
  
  // Send out our input state
  setInterval(function() {
    
    if(Game.Input.mouseX != lastPushedState.x || Game.Input.mouseY != lastPushedState.y) {
      lastPushedState.x =  Game.Input.mouseX;
      lastPushedState.y =  Game.Input.mouseY;
      
      $.post('http://localhost:8000', lastPushedState);
    }
  }, 1000);
  
  
  // DEBUGGY SETUP CODE
  var player = new Game.Ghost();
  document.body.appendChild(player.el);
  
  Game.entities.push(player);
  Game.run();
  
}).call(this);