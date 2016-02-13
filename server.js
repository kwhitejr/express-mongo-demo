var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
  var server = app.listen(3000, function() {
    console.log('Listening to port', server.address().port);
  });
});