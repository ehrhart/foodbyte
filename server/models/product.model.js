const mongoose = require('mongoose');
const Product = require('../models/price.model');

const ProductSchema = new mongoose.Schema({
  off_id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number
  },
  nutrition_grade: {
    type: String
  },
  brands: {
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
  avgPrice:{
    type: [Number],
  },
  images: {
    type: [mongoose.Schema.Types.Mixed]
  },
  image_url: {
    type: String
  },
  image_thumb_url: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
