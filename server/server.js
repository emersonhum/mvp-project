var express = require('express');
var handler = require('./request-handler');



var app = express();

var port = 3000;

app.listen(port);

app.get('/', handler.showHomepage);
app.post('/', handler.submitAPIrequest);

console.log('Listening on port :', port);