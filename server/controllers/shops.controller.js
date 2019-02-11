const Shop = require('../models/shop.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;
  try {
    return res.json(await Shop.find().skip(offset).limit(perPage).exec());
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    return res.json(await Shop.findById(req.params.id));
  } catch (e) {
    next(e);
  }
}
