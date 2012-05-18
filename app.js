/**
 * Super dumb server to reflect client post data to all subscribers
 */

var express = require('express'),
    app = express.createServer(),
    Pusher = new require('node-pusher');
  
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
    playerId: req.sessionID,
    x: parseInt(req.body.x),
    y: parseInt(req.body.y),
    ping: req.body.ping
  }
  
  pusher.trigger('ghost_input', 'player_input', data);
  res.send('ok');
});

app.listen(8000);
console.log('Server running at http://127.0.0.1:8000');
