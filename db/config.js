require('dotenv').config();

var mongoose = require('mongoose');
var mongoServer = process.env.MONGO_SERVER;
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;

var mongoURI = `mongodb://${mongoUsername}:${mongoPassword}@${mongoServer}`;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI,  {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
