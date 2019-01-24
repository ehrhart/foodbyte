// config should be imported before importing any other file
const config = require('../config/config');
require('../config/mongoose');

const mongoose = require('mongoose');
const Product = require('../models/product.model');

(async() => {
  // Create a temporary schema for OpenFoodFacts
  const OffProductSchema = new mongoose.Schema({}, {
    collection: 'off_france',
    strict: false
  });
  const OffProduct = mongoose.model('OffProduct', OffProductSchema);

  const offDocs = await OffProduct.find({
    id: { $exists: 1 },
    product_name_fr: { $exists: 1 },
    nutriments: { $gt: {} }
  }).lean().exec();
  console.log(`Found ${offDocs.length} documents in OpenFoodFacts collection`);

  for (const offDoc of offDocs) {
    const product = new Product({
      off_id: offDoc.id || '',
      name: offDoc.product_name_fr || '',
      nutrition_grade: offDoc.nutrition_grade_fr || '',
      brands: [],
      stores: [],
      ingredients_text: offDoc.ingredients_text || '',
      ingredients: offDoc.ingredients || [],
      nutriments: offDoc.nutriments || [],
      images: offDoc.images
    });
    delete product._id;

    if (offDoc.brands) {
      product.brands = offDoc.brands.split(',');
    }
    if (offDoc.stores) {
      product.stores = offDoc.stores.split(',');
    }

    try {
      const productData = product.toObject();
      delete productData._id;

      await Product.update({
        off_id: offDoc.id,
      }, productData, {
        upsert: true
      });
      console.log(`Updated product with OFF ID "${offDoc.id}".`);
    } catch (err) {
      console.log(`An error occured while updating the product with OFF ID "${offDoc.id}".`)
      console.error(err);
    }
  }

  // Do not forget to close the database connection
  mongoose.connection.close();
})();