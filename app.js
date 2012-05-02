/**
 * Super dumb server to reflect client post data to all subscribers
 */

var express = require('express'),
    app = express.createServer(),
    Pusher = require('node-pusher');

app.configure(function() {
  app.use('/static', express.static(__dirname + '/static'));
  app.use(express.bodyParser());
});

// Using Jquery template engine, cause fuck you jade. I want to write html
app.set('view options', {layout: false});
app.set('view engine', 'html');
app.register('.html', require('jqtpl').express);

// Load our page
app.get('/', function(req, res) {
  res.render('index', {});
});

// And echo position posts
app.post('/', function(req, res) {
  console.log(req.body);
  res.send();
});

app.listen(8000);
console.log('Server running at http://127.0.0.1:8000');