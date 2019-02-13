const nlp = require('compromise');
const Product = require('../models/product.model');

module.exports = {
  load,
  getProductsFromRecipeText,
};

const lexicon = {};
const productsMapping = {};

async function load() {
  // Preload the lexicon with products from the database
  console.log('[NLP] Loading lexicon...');
  const products = await Product.find();
  products.forEach(product => {
    if (product.name) {
      const singular = product.name;
      lexicon[singular] = 'Product'; // Singular form
      if (!productsMapping[singular]) {
        productsMapping[singular] = [];
      }
      productsMapping[singular].push(product._id);

      const plural = nlp(product.name).tag('Singular').nouns().toPlural().out();
      if (plural !== singular) {
        lexicon[plural] = 'Product'; // Plural form
        if (!productsMapping[plural]) {
          productsMapping[plural] = [];
        }
        productsMapping[plural].push(product._id);
      }
    }
  });
  console.log(`[NLP] Lexicon loaded! Contains ${Object.keys(lexicon).length} keys.`);
  return Promise.resolve();
}

async function getProductsFromRecipeText(recipeText) {
  doc = nlp(recipeText, lexicon);
  const occurrences = doc.clauses().match('#Product+').out('offset');
  const foundProducts = {};
  for (const occurrence of occurrences) {
    const productsIds = productsMapping[occurrence.normal];
    if (productsIds) {
      const products = await Product.find({ _id: { $in: productsIds } });
      products.forEach(product => {
        foundProducts[product._id] = product;
      });
    }
  }
  console.log(`Found ${Object.keys(foundProducts).length} products from parsing`);
  return Object.values(foundProducts);
}
