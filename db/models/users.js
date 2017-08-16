var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  pastSearches: Array
}, {collection: 'Users'});

var User = mongoose.model('User', userSchema);

module.exports = User;
