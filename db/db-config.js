var db = require('mongoose');
var Promise = require('bluebird');
db.Promise = Promise;

var Schema = db.Schema;

var userSchema = new Schema({
  username: String,
  followerCount: Number,
  followingCount: Number,
  followRatio: Number,
  bot: String
});

var User = db.model('User', userSchema);

module.exports = User;