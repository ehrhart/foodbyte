const Product = require('../models/product.model');

module.exports = {
  getAll,
  getById
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;
  const query = req.query ;

  let filters = {} ;
  let shop = req.query.shop ;
  let minPrice = req.query.minprice ;
  let maxPrice = req.query.maxprice ;
  if(query.name != null) {
    filters.name = {
      $regex: ".*" + query.name + ".*", 
      $options:"i"
    };    
  }
  if(query.shop != null){
    filters.prices.shopName = {
      $regex: ".*" + query.shop + ".*", 
      $options:"i"
    };   
  }
  if((query.minP != null)&&(query.maxP != null)){
    filters.prices.price = {$gte : query.minP , $lt : query.maxP}
  }
  
    try {
      return res.json(await Product.find(filters).skip(offset).limit(perPage).exec());
    } catch (e) {
      next(e);
    }
  
     

  
}


async function getById(req, res, next) {
  try {
    return res.json(await Product.findById(req.params.id));
  } catch (e) {
    next(e);
  }
}

