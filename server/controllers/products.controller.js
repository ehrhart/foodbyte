const Product = require('../models/product.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;
  try {
    return res.json(await Product.find().skip(offset).limit(perPage).exec());
  } catch (e) {
    return res.json(e);
  }
}

async function getById(req, res) {
  try {
    return res.json(await Product.findById(req.params.id));
  } catch (e) {
    return res.json(e);
  }
}
