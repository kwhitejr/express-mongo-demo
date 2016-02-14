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

app.route('/drawings')
  .get(function (req, res) {

    Drawing.find(function (err, drawings) {
      if (err) {
        console.error(err);
      }
      res.json(drawings);
    });

  })
  .post(function (req, res) {
    var newDrawing = new Drawing({
      name: req.body.name,
      author: req.body.author
    });
    newDrawing.save();
    res.send('Great post!');
  });

app.route('/drawings/:id')
  .get(function (req, res) {
    console.log(req.params);
    Drawing.findOne({ '_id': req.params.id })
    .then(function (result) {
      res.json(result);
    });
  })
  .put(function (req, res) {
    Drawing.update(
      { '_id': req.params.id },
      { $set: {
          name: req.body.name,
          author: req.body.author
        }
      }
    )
    .then(function (result) {
      res.json(result);
    });
  });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  var server = app.listen(CONFIG.PORT, function() {
    console.log('Listening to port', CONFIG.PORT);
  });
});