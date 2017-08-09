var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: { type: String, required: true, index: {unique: true}},
	password: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

//comparePassword function to come when routing is done 

//should create a hash and salt it with bcrypt

module.exports = User;