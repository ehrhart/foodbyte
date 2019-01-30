const mongoose = require('mongoose');

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
  ingredients: {
    type: [String]
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);
