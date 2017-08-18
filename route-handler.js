var db = require('./db/config');
var User = require('./db/models/users');
var Ingredient = require('./db/models/ingredients');
var path = require('path');

var vision = require('@google-cloud/vision')({
  keyFilename: 'key.json',
  projectId: 'ingredients2020-176919'
});

//createUser api route
exports.findOrCreateUser = function(req, res) {
  var email = req.body.email;

  User.findOne({username: email})
    .exec(function(err, user) {
      // if user doesn't exist, create a new user
      if(!user) {
        var newUser = new User({username: email})
        newUser.save((err, user) => {
          if (err) {
            console.log('user not found and not saved!')
          } else {
            res.status(201).send(user.username);
          }
        });
      } else if (user){
        res.status(200).send(user.username);
      } else {
        res.sendStatus(400);
      }

    });
}

//ingredient search api route
exports.ingredients = function(req, res) {
  var ingredient = req.body.data.ingredient;
  var username = req.body.data.username;

  Ingredient.findOne({name: ingredient})
    .exec(function(err, ingredientObj) {
      //if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
      if (!ingredientObj) {
        res.status(401).send(`${ingredient} not in database`);
      } else {
        User.findOneAndUpdate({username: username}, {"$push": {"pastSearches": ingredientObj}})
          .exec(function(err, user) {
            if (err) {
              throw err;
            } else {
              console.log(user);
            }
          })

        res.json(ingredientObj);
      }
    });
};

//get past searches api route
exports.pastSearches = function(req, res) {
  // var userID = req.body.data.userID;
  var username = req.body.data.username;
  User.findOne({username: username})
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
  vision.textDetection({ content: buf }, function(err, apiResponse) {
    if(err) {
      console.log('ERROR CLOUD API DIDNT GO THROUGH', err);
      res.end('Cloud Vision Error:', err);
    } else {
      // res.writeHead(200, {
      //   'Content-Type': 'text/html'
      // });
      var detections = apiResponse.fullTextAnnotation.text;
      var arrayOfIngredients = [];
      //console.log('this is the string', apiResponse.fullTextAnnotation);
      var ingredientsArray = detections.replace(/\n/g, ' ').replace(/\./g, ',').toLowerCase().split(', ');
      console.log('this is the filtered array ', ingredientsArray);

      var toxicIngredients = [];
      ingredientsArray.forEach(function(ingredient) {
        (function (currentIngredient) {
        Ingredient.findOne({name: currentIngredient}, 
          function(err, ingredientObj) {
          //if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
          if (err) {
            // res.status(401).send(`${ingredient} not in database`);
            console.log('ERROR:' + err);
          } else if(ingredientObj) {
            console.log('THE INGREDIENT EXISTS');
            console.log(ingredientObj)
            toxicIngredients.push(ingredientObj);
          }
        });
      }) (ingredient);

      })
      console.log(toxicIngredients);
      res.json(toxicIngredients);
    }
  })
}

exports.callback = function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
}
