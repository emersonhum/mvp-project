var express = require('express');
var handler = require('./request-handler');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');




var app = express();

app.use(express.static(path.join(__dirname, '/../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', handler.submitAPIrequest);

var port = 3000;

app.listen(port);

// app.get('/', handler.showHomepage);
// app.post('/', handler.submitAPIrequest);

console.log('Listening on port :', port);

mongoose.connect('mongodb://localhost/mvp-project');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('we gucci');
});

