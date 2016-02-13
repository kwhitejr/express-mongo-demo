var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    CONFIG = require('./config');

mongoose.connect('mongodb://localhost/mongoose-demo');

var drawingSchema = mongoose.Schema({
  name: String,
  author: String
});
// collection name will get pluralized by mongoose
var Drawing = mongoose.model('Drawing', drawingSchema);

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  var newDrawing = new Drawing({
    name: 'Foo',
    author: 'Bar'
  });
  newDrawing.save();
  res.send('You done gotten it!');
});

app.post('/', function (req, res) {
  var newDrawing = new Drawing({
    name: req.body.name,
    author: req.body.author
  });
  newDrawing.save();
  res.send('Great post!');
});

app.route('/drawings')
  .get(function (req, res) {
    res.send('get so good');
  })
  .post(function (req, res) {
    res.send('post so good');
  });

app.route('/drawings/:id')
  .get(function (req, res) {
    res.send('get that thing');
  })
  .put(function (req, res) {
    res.send('fix that thing');
  });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var server = app.listen(CONFIG.PORT, function() {
    console.log('Listening to port', CONFIG.PORT);
  });
});