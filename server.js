var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});