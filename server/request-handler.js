var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var keys = require('./twitterAPIKeys');
var Promise = require('bluebird');
var db = require('../db/db-config');

var Twitter = require('twitter');

var emerson = new Twitter({
  'consumer_key': keys.consumer_key,
  'consumer_secret': keys.consumer_secret,
  'access_token_key': keys.access_token_key,
  'access_token_secret': keys.access_token_secret
});

emerson = Promise.promisifyAll(emerson);



// exports.showHomepage = function(req, res) {
//   console.log('hello');
//   res.sendFile(path.join(__dirname, '../client/index.html'));
//   // res.sendFile('index.html', {root: path.join(__dirname, '../client')});
// };

exports.submitAPIrequest = function(req, res) {
  var twitterHandle = req.body.username;
    emerson.getAsync('followers/list', {screen_name: twitterHandle, count: 5})
    .then(function(followers) {
      // console.log(followers);
      res.send(followers);
    })
    .catch(function(err) {
      throw err;
    });
};

// exports.getFollowingRatio = function(req, res) {
//   var twitterHandle = req.body.username;
//   var options = {
//     screen_name: twitterHandle,
//     count: 5000
//   }
//   emerson.get('followers/ids', options, function(err, followers, response) {
//     if (err) {
//       throw err;
//     }
//     res.send(followers);
//   });
// };