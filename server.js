var express = require('express');
var path = require('path');
// var db = require('./db/config.js');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// });

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`listening on ${port}`);
});

module.exports = app;
