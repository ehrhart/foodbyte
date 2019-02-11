const mongoose = require('mongoose');

const RecipeCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('RecipeComment', RecipeCommentSchema);
