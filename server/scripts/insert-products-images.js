// config should be imported before importing any other file
const config = require('../config/config');
require('../config/mongoose');
const axios = require('axios');

const mongoose = require('mongoose');
const Product = require('../models/product.model');

(async() => {
  const products = await Product.find();

  for (const product of products) {
    try {
      const productData = (await axios.get(`https://openfoodfacts.org/api/v0/product/${product.off_id}.json`)).data;
      if (productData && productData.status === 1) {
        product.images = productData.product.selected_images || {};
        product.image_url = productData.product.image_url;
        product.image_thumb_url = productData.product.image_thumb_url;
      }
      await product.save();
      console.log(`Inserted images for product with OFF ID "${product.off_id}".`);
    } catch (err) {
      console.log(`An error occured while updating the product with OFF ID "${product.off_id}".`)
      console.error(err);
    }
  }

  // Do not forget to close the database connection
  mongoose.connection.close();
})();
