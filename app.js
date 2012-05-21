/**
 * Super dumb server to reflect client post data to all subscribers
 */

var express = require('express'),
    app = express.createServer(),
    Pusher = new require('node-pusher'),
    states = [];
  
var pusher = new Pusher({
  appId: '19432',
  key: '22bc0fb0343194de2f30',
  secret: '994bac2e9fcfd69b3980'
});

app.configure(function() {
  app.use('/static', express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "super ghost funtime" }));
});

// Using Jquery template engine, cause fuck you jade. I want to write html
app.set('view options', {layout: false});
app.set('view engine', 'html');
app.register('.html', require('jqtpl').express);

// Load our page
app.get('/', function(req, res) {
  res.render('index', {playerId: req.sessionID});
});

// And echo position / update posts
app.post('/', function(req, res) {
  var data = {
    // Player state
    playerId: req.sessionID,
    timestamp: parseInt(req.body.timestamp) || null,
    x: parseInt(req.body.x),
    y: parseInt(req.body.y),
    health: parseInt(req.body.health),
    
    // Attack state
    ping: req.body.ping || false,
    pingX: req.body.pingX || null,
    pingY: req.body.pingY || null,
  }
  
  quePlayerState(data);
  res.send('ok');
});

// State pushing
function quePlayerState(state) {
  pusher.trigger('ghost_game', 'player_state', state);
}

// Kick off our wierd, hybrid server
app.listen(8000);
console.log('Server running at http://127.0.0.1:8000');
