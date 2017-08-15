var app = require('./server-config');

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`listening on ${port}`);
});
