var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var handler = require('./route-handler');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'build')));

//user creation api route
app.post('/api/signup', handler.signup);

//login route
app.post('/api/login', handler.login);

//ingredient search api route
app.post('/api/ingredients', handler.ingredients);

module.exports = app;
