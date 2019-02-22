const Product = require('../models/product.model');
const Price = require('../models/price.model');
const mongoose = require('mongoose');
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
  if((query.minp)&&(query.maxp)){
    filters.prices={};
    filters.prices = { price :{$gte: query.minp}};

  }

  const totalResults = (await Product.countDocuments(filters));

    try {
      return res.json({
        totalResults: totalResults,
        totalPages: Math.ceil(totalResults / perPage),
        results: await Product.find(filters)
                                .populate({path: 'prices', select: 'price date',model: 'Price',
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
      const id = new mongoose.Types.ObjectId(req.params.id);
      const priceavg =  (await Price.aggregate([
        {
        $match : { "productId" : id }
        },
        {$group : {"_id" : "$productId", "avg" : {$avg :"$price"} }} 
      ]));
      console.log(priceavg[0].avg);
      let newprice = {
        avgPrice : priceavg[0].avg
      };
      try {
        (await Product.updateOne({"_id": id},newprice).catch(next));
      }catch (e) {
        next(e);
      }   
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
    );
    const id = new mongoose.Types.ObjectId(req.params.id);
    const priceavg =  (await Price.aggregate([
      {
      $match : { "productId" : id }
      },
      {$group : {"_id" : "$productId", "avg" : {$avg :"$price"} }} 
      ]));
      console.log(priceavg[0].avg);
      let newprice = {
        avgPrice : priceavg[0].avg
      };
      try {
        (await Product.updateOne({"_id": id},newprice).catch(next));
      }catch (e) {
        next(e);
      }  
    }
}
