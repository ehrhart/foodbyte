const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: {
      country: {
        type: String
      },
      postalCode: {
        type: String
      },
      locality: {
        type: String
      },
      street: {
        type: String
      }
    },
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Shop', ShopSchema);
