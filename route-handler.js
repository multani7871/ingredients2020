var db = require('./db/config');
var User = require('./db/models/users');
var Ingredient = require('./db/models/ingredients');

//user creation api route
exports.signup = function(req, res) {
  var username = req.body.data.username;
  var password = req.body.data.password;

  User.findOne({username: username})
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
          if (err) { res.status(500).send('this is an error'); }
          // TODO: create session
          console.log(`${username} created`);
          res.send(`${username} created`);
        });
      } else {
        console.log(`username exists`);
        //res.redirect('/dashboard');
        res.status(401).send(`username exists`);
        // TODO: redirect back to the signup page
      }
    });
};

//login route
exports.login = function(req, res) {
  var username = req.body.data.username;
  var password = req.body.data.password;

  console.log('line 49', username);

  User.findOne({username: username})
    .exec(function(err, user) {
      if (!user) {
        console.log('user does not exist, signup please');
        // res.redirect('/signup');
        res.status(403).send('user does not exist, signup please');
      } else {
        user.comparePassword(password, user.password, function(err, match) {
          if (match) {
            // TODO: take them to dashboard?
            console.log('user ID: ', user.id);
            res.send(user.id);
            // res.redirect('/dashboard');
          } else {
            console.log('line 66: incorrect password');
            //res.redirect('/login');
            res.status(401).send('incorrect password');
          }
        });
      }
    });
};

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
  var userID = req.body.data.userID;

  User.findOne({_id: userID})
    .exec(function (err, user) {
      if (!user) {
        res.status(401).send('user not found in database');
      } else {
        res.send(user.pastSearches);
      }
    })
}
