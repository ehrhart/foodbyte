const mongoose = require('mongoose');
const Product = require('../models/shop.model');

const PriceShema = new mongoose.Schema({
    
    shopId :{
        type:mongoose.Schema.ObjectId,
        ref:'Shop',
        required: true
      },
    shopName:{
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now ,
        required: true
    },
    price :{
        type : Number ,
        required: true
    }
    

});

module.exports = mongoose.model('Price', PriceShema);
