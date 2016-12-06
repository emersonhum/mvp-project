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
  .then(handler.getFollowingCount(req, res))
  .catch(function(err) {
    throw err;
  });
};

exports.getFollowingCount = function(req, res) {
  var twitterHandle = req.body.username;
  var userInfo;
  emerson.getAsync('friends/ids', {screen_name: twitterHandle, count: 5000})
  .then(function(following) {
    this.following = following;
    var tempUser = User.findOne({'username': twitterHandle});
    return tempUser.exec();
  })
  .then(function(user) {
    console.log('found user!!!', user);
    user.followingCount = this.following.ids.length;
    user.followRatio = user.followerCount / user.followingCount;
    console.log(user);
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






    //   userInfo.exec(function(err, info) {

    //   res.send(infoObj);
    // }))

    // .catch(function(err) {
    //   throw err;
    // });
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