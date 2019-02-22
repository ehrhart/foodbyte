const Product = require('../models/product.model');
const Price = require('../models/price.model');
module.exports = {
  getAll, 
  remove
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;
  const query = req.query ;

    try {
      return res.json(await Price.find().skip(offset).limit(perPage).exec());
    } catch (e) {
      next(e);
    }
}
async function remove(req, res, next) {
    Price.deleteOne({
      _id: req.params.id,
    })
    .then(() => res.status(204)) // 204 No Content
    .catch(next);
  }

  
     
