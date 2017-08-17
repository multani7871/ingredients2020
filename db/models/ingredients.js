var mongoose = require('mongoose');

var ingredientsSchema = mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true }
}, {collection: 'Ingredients'});

var Ingredient = mongoose.model('Ingredient', ingredientsSchema);

module.exports = Ingredient;
