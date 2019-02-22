const Shop = require('../models/shop.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;

  const keywords = req.query.q;

  const filterParams = {};
  if (keywords) {
    filterParams.name = { $regex: new RegExp(keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') };
  }

  try {
    return res.json({
      totalPages: (await Shop.countDocuments(filterParams)),
      results: await Shop.find(filterParams).skip(offset).limit(perPage).exec()
    });
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
