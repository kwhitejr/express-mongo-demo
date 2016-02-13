var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
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

// mongoose.connect('mongodb://localhost/test');

// var Cat = mongoose.model('Cat', { name: String });

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });

var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});