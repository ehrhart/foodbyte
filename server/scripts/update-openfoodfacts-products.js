// config should be imported before importing any other file
const config = require('../config/config');
require('../config/mongoose');
const axios = require('axios');

const mongoose = require('mongoose');
const Product = require('../models/product.model');

const nutrientStatuses = {
  'fat': {
    'low': 5,
    'moderate': 2,
    'high': 0
  },
  'satured-fat': {
    'low': 5,
    'moderate': 2,
    'high': 0
  },
  'salt': {
    'low': 5,
    'moderate': 2,
    'high': -2
  },
  'sugar': {
    'low': 5,
    'moderate': 2,
    'high': -2
  }
}

function calculateScore(offDoc) {
  // Base score
  let score = 50;

  // Bonus
  if (offDoc.vitamins_tags) {
    score += offDoc.vitamins_tags.length;
  }

  // Malus
  if (offDoc.additives_tags) {
    score -= offDoc.additives_tags.length;
  }
  if (offDoc.ingredients_that_may_be_from_palm_oil_tags && offDoc.ingredients_that_may_be_from_palm_oil_tags.length) {
    score -= 2;
  }
  if (offDoc.ingredients_from_palm_oil_tags && offDoc.ingredients_from_palm_oil_tags.length) {
    score -= 5;
  }
  if (offDoc.allergens_from_ingredients && offDoc.allergens_from_ingredients.length) {
    score -= 2;
  }

  // Nutrition grades
  if (offDoc.nutrition_grades) {
    switch (offDoc.nutrition_grades) {
      case 'a':
        score += 5;
        break;
      case 'b':
        score += 3;
        break;
      case 'c':
        score -= 3;
        break;
      case 'd':
        score -= 5;
        break;
      default:
        break;
    }
  }

  /*
  // Nutrient levels
  if (offDoc.nutrient_levels) {
    for (const nutrient in offDoc.nutrient_levels) {
      const status = nutrientStatuses[nutrient];
      if (status) {
        const nutrientScore = status[offDoc.nutrient_levels[nutrient]];
        if (nutrientScore) {
          score += nutrientScore;
       }
      }
    }
  }
  */

  // Nutriments
  if (offDoc.nutriments) {
    for (const nutriment in offDoc.nutriments) {
      const value = parseFloat(offDoc.nutriments[nutriment]);
      if (!value) continue;

      switch (nutriment) {
        // Malus
        case 'alcohol_100g':
          score -= 5;
          break;
        case 'fat_100g':
          score -= Math.floor(value / 2);
          break;
        case 'saturated-fat_100g':
          score -= Math.floor(value / 2);
          break;
        case 'salt_100g':
          score -= Math.floor(value);
          break;
        case 'sodium_100g':
          score -= Math.floor(value);
          break;
        // Bonus
        case 'proteins_100g':
          score += Math.floor(value);
          break;
        case 'fiber_100g':
          score += Math.floor(value / 2);
        default:
          break;
      }
    }
  }


  return Math.max(0, score);
}

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
      ingredients_text: offDoc.ingredients_text || '',
      ingredients: offDoc.ingredients || [],
      nutriments: offDoc.nutriments || [],
    });

    delete product._id;

    if (offDoc.brands) {
      product.brands = offDoc.brands.split(',');
    }

    // Calculate score
    product.score = calculateScore(offDoc);
    console.log(`Product ${product.name} gets a score of ${product.score}`);

    // Update product in database
    try {
      const productData = product.toObject();
      delete productData._id;

      await Product.updateOne({
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
