var db = require('mongoose');

var Schema = db.Schema;

var userSchema = new Schema({
  username: String,
  followerCount: Number,
  followingCount: Number,
  followRatio: Number
});

var User = db.model('User', userSchema);

module.exports = User;