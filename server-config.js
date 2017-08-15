var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./route-handler');

var app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'build')));

//routes
app.post('/api/signup', handler.signup);
app.post('/api/login', handler.login);
app.post('/api/ingredients', handler.ingredients);

module.exports = app;
