var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String}
}, {collection: 'Users'});

//comparePassword function to come when routing is done

// TODO: upgrade to auth0 or add salts

userSchema.methods.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

//should create a hash and salt it with bcrypt

module.exports = User;