var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var keys = require('./twitterAPIKeys');
var Promise = require('bluebird');
var User = require('../db/db-config');
var handler = require('./request-handler');



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

exports.getFollowerCount = function(req, res) {
  var twitterHandle = req.body.username;
  emerson.getAsync('followers/ids', {screen_name: twitterHandle, count: 5000})
  .then(function(followers) {
    var newUser = User({
      username: twitterHandle,
      followerCount: followers.ids.length
    });
    return newUser.save();
  })
  .then(function() {
    return emerson.getAsync('friends/ids', {screen_name: twitterHandle, count: 5000});
  })
  .then(function(following) {
    this.following = following;
    var tempUser = User.findOne({'username': twitterHandle});
    return tempUser.exec();
  })
  .then(function(user) {
    user.followingCount = this.following.ids.length;
    user.followRatio = user.followerCount / user.followingCount;
    return user.save();
  })
  .then(function() {
    var userInfo = User.findOne({'username': twitterHandle});
    return userInfo.exec();
  })
  .then(function(info) {
    var infoObj = {
    'username': info.username,
    'followerCount': info.followerCount,
    'followingCount': info.followingCount,
    'followRatio': info.followRatio
    };
    console.log(infoObj.followerCount);
    res.send(infoObj);
  });
};

exports.getDatabase = function(req, res) {
  console.log('got got');
  // console.log(User);
  User.find({}, function(err, data) {
    res.send(data);
  });
};