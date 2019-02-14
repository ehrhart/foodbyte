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
    filters.prices={
      'shopId': query.shop
    };
    
  }
  if((query.minP)&&(query.maxP)){
    filters.prices.price = {$gte : query.minP , $lt : query.maxP};
  }

    try {
      return res.json({
        totalPages: (await Product.countDocuments(filters)),
        results: await Product.find({"prices.shopId":  query.shop })
                                .populate({path: 'prices', select: 'price date',model: 'Price',match: { shopId: query.shop},
                                  populate: {
                                    path: 'shopId',
                                    model: 'Shop',
                                    select:'name'
                                  }})
                                  .skip(offset)
                                  .limit(perPage)
                                  .exec()
      });
    } catch (e) {
      next(e);
    }
/*
 try {
  return res.json({results :  await Product.aggregate([
    {
    $lookup:
      {
        from: Price.collection.name,
        localField: "prices",
        foreignField: "_id",
        as: "prices"
      }},
    
    {$unwind :{
      path :"$prices" ,
      }},
      {$match: {$and: [
        {'prices.price' : { $gte: query.minp}},
        {'prices.price' : {$lt: query.maxp}}]
      }}
      
     ]).skip(offset)
     .limit(perPage).exec().catch(next)});
    }catch(e){
      next(e);
    } */

  
}
async function getPrice(req, res, next) {
  try {
    return res.json(await Product
      .findById(req.params.id)
      .select('-_id prices')
      .populate('prices')
      .exec()
    );
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    return res.json(await Product.findById(req.params.id)
                          .populate({path: 'prices', select: 'price date',model: 'Price',
                          populate: {
                            path: 'shopId',
                            model: 'Shop',
                            select:'name'
                          }}));
  } catch (e) {
    next(e);
  }
}

async function editPrice(req,res,next){
  const price = (await Price.findOne({shopId : req.query.shopId , productId:req.params.id}));
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
    }else{
      res.status(304).send('error  le prix n est pas modifié ');
      next(res);
    }
  }else {
    Price.create({
      shopId: req.query.shopId,
      productId : req.params.id,
      price: req.query.price,
      date:req.query.date
    },function(err,price){
      if(!err){
        Product.findOneAndUpdate({
          _id: req.params.id
        }, {
          '$push': {
              prices : price._id
        }
        })
        .then(product => res.json(product))
        .catch(next);
      }
    }
    )}
}
