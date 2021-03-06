const mongoose = require('mongoose');
const RecipeComment = require('./recipe-comment.model');
const RecipeRating = require('./recipe-rating.model');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  },
  image_thumb_url: {
    type: String
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  comments: [RecipeComment.schema],
  ratings: [RecipeRating.schema],
  avgRating: {
    type: Number
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);
