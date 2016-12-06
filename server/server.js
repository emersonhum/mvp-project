var express = require('express');
var handler = require('./request-handler');
var bodyParser = require('body-parser');
var path = require('path');



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

