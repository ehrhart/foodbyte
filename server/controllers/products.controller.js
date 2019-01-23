const Product = require('../models/product.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res) {
  const page = req.query.p || 1;
  const limit = 20;
  const offset = (page - 1 ) * limit;
  try {
    return res.json(await Product.find().skip(offset).limit(limit).exec());
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
