const Product = require('../models/product.model');
const Price = require('../models/price.model');
module.exports = {
  getAll,
  getById,
  editPrice,
  getPrice
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const offset = (page - 1 ) * perPage;
  const query = req.query ;

  let filters = {} ;
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
      return res.json({
        totalPages: (await Product.countDocuments(filters)),
        results: await Product.find(filters).skip(offset).limit(perPage).exec()
      });
    } catch (e) {
      next(e);
    }
  
     

  
}
async function getPrice(req, res, next) {
  try {
    return res.json(await Price.find({productId : req.params.id}));
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

async function editPrice(req,res,next ){
  try{
  return Price.findOne({shopId : req.query.shopId , productId:req.params.id},function(err, price,next) {
    if(!err){
      if(price){
        console.log("not error in findOne");
        const da = new Date(price.date);
        const d = new Date(req.query.date);
        if(da < d){
          console.log("date test ok");
          let newvalues = {
            price : req.query.price, 
            date : req.query.date
          };
          Price.updateOne({"_id": price._id},newvalues)
          .then(price => res.json(price))
          .catch(next);
        }
      }
      else {
        Price.create({
          shopId: req.query.shopId,
          productId : req.params.id,
          price: req.query.price,
          date:req.query.date
        })
        .then(price => res.json(price))
        .catch(next);
      }
    }
 })
}catch(err){
  next(e);
}

}