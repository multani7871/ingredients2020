var db = require('./db/config');
var User = require('./db/models/users');
var Ingredient = require('./db/models/ingredients');

var vision = require('@google-cloud/vision')({
  keyFilename: 'key.json',
  projectId: 'ingredients2020-176919'
});

//ingredient search api route
exports.ingredients = function(req, res) {
  var ingredient = req.body.data.ingredient;
  var userID = req.body.data.userID;

  Ingredient.findOne({name: ingredient})
    .exec(function(err, ingredientName) {
      //if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
      if (!ingredientName) {
        res.status(401).send(`${ingredient} not in database`);
      } else {
        User.findByIdAndUpdate(userID, {"$push": {"pastSearches": ingredientName.name}})
          .exec(function(err, user) {
            if (err) {
              throw err;
            } else {
              console.log(user);
            }
          })

        res.json(ingredientName);
      }
    });
};

//get past searches api route
exports.pastSearches = function(req, res) {
  // var userID = req.body.data.userID;

  User.findOne({_id: userID})
    .exec(function (err, user) {
      if (!user) {
        res.status(401).send('user not found in database');
      } else {
        res.send(user.pastSearches);
      }
    })
}

exports.googleCloudSearch = function(req, res) {
  var buf = new Buffer(req.body.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
  var base64 = req.body.data_uri.replace(/^data:image\/\w+;base64,/, "");
  vision.textDetection({ content: buf }, function(err, apiResponse) {
    if(err) {
      console.log('ERROR CLOUD API DIDNT GO THROUGH', err);
      res.end('Cloud Vision Error:', err);
    }else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      //res.write('<!DOCTYPE HTML><html><body>');
      // Base64 the image so we can display it on the page
      //res.write('<img width=200 src="' + req.body.data_uri + '"><br>');
      var detections = apiResponse.textAnnotations;
      var arrayOfIngredients = [];
      detections.forEach((text) => arrayOfIngredients.push(text.description));
      console.log('IT WORKED!!!:', arrayOfIngredients.slice(1));
      res.send(base64);
      // Write out the JSON output of the Vision API
      //res.write(JSON.stringify(arrayOfIngredients.slice(1)));
     // res.end('</body></html>');
    }
  })
}