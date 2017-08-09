var mongoose = require('mongoose');

var ingredientsSchema = mongoose.Schema({
  ingredient: { type: String, required: true },
  links: { type: String, required: true }
});

var Ingredient = mongoose.model('Ingredient', ingredientsSchema);

module.exports = Ingredient;