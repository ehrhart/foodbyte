const mongoose = require('mongoose');
const Shop = require('../models/shop.model');
const Product = require('../models/product.model');


const PriceShema = new mongoose.Schema({
    
    shopId :{
        type:mongoose.Schema.ObjectId,
        ref:'Shop',
        required: true
      },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
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
