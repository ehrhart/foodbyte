const mongoose = require('mongoose');

const RecipeRatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  value: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('RecipeRating', RecipeRatingSchema);
