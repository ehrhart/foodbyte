const Shop = require('../models/shop.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const keywords = req.query.q;

  const validSortBy = {
    'name': 'name',
    'created': 'createdAt',
    'updated': 'updatedAt',
    'score': 'score',
  };
  const sortBy = validSortBy[req.query.s] || Object.values(validSortBy)[0];
  const sortOrder = req.query.o === 'asc' ? 1 : -1;

  const filterParams = {};
  if (keywords) {
    filterParams.name = { $regex: new RegExp(keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') };
  }

  const totalResults = (await Shop.countDocuments(filterParams));

  const offset = (page - 1 ) * perPage;
  try {
    return res.json({
      totalResults: totalResults,
      totalPages: Math.ceil(totalResults / perPage),
      results: await Shop
        .find(filterParams)
        .skip(offset)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder })
        .exec()
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
