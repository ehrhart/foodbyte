const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  off_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  nutrition_grade: {
    type: String
  },
  brands: {
    type: [String]
  },
  stores: {
    type: [String]
  },
  ingredients_text: {
    type: String
  },
  ingredients: {
    type: [mongoose.Schema.Types.Mixed]
  },
  nutriments: {
    type: [mongoose.Schema.Types.Mixed]
  },
  images: {
    type: [String]
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
