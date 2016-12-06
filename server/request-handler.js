var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var keys = require('./twitterAPIKeys');

var Twitter = require('twitter');

var emerson = new Twitter({
  'consumer_key': keys.consumer_key,
  'consumer_secret': keys.consumer_secret,
  'access_token_key': keys.access_token_key,
  'access_token_secret': keys.access_token_secret
});



// exports.showHomepage = function(req, res) {
//   console.log('hello');
//   res.sendFile(path.join(__dirname, '../client/index.html'));
//   // res.sendFile('index.html', {root: path.join(__dirname, '../client')});
// };

exports.submitAPIrequest = function(req, res) {
  var twitterHandle = req.body.username;
  emerson.get('followers/list', {screen_name: twitterHandle, count: 5}, function(error, followers, response) {
    if(error) {
      throw error;
    }
    console.log(followers);  // The favorites.   // Raw response object. 
    console.log(req.body.username);
    res.send(followers);
  });
};