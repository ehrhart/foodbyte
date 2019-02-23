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
  let shopFilter={};
  let productsIDS =[];
  let sortFilter={};
  if(query.name != null) {
    filters.name = {
      $regex: ".*" + query.name + ".*", 
      $options:"i"
    };    
  }
  if((query.sort != null)&&((query.asc== 1)||(query.asc == -1))){
    console.log('1');
    if(query.sort === 'name'){
      sortFilter = {name : query.asc} ;
    }
    else if(query.sort === 'price'){
      sortFilter = {priceavg : query.asc} ;
    }
    else{
      sortFilter = {score : query.asc};
    }
  }
if(query.minp){
  filters.avgPrice = {$gte: query.minp};
}
if(query.maxp){
  filters.avgPrice = {$lt: query.maxp};
}
if(query.minp && query.maxp){
  filters.avgPrice = {$gte: query.minp,$lt : query.maxp};
}
if(query.shop != null){
    const shop = new mongoose.Types.ObjectId(query.shop);
    shopFilter.shopId= shop;
    const products = ( await (Price.find(shopFilter,{productId : 1,_id:0})
                                    .skip(offset)
                                    .limit(perPage)
                                    .exec()) );
    
    products.forEach(function(productId){
        productsIDS.push(new mongoose.Types.ObjectId(productId['productId']));
    });
    filters._id = {$in : productsIDS} ;
    
  }
  console.log(sortFilter);
  const totalResults = (await Product.countDocuments(filters));
    try {
      return res.json({
        totalResults: totalResults,
        totalPages: Math.ceil(totalResults / perPage),
        results: (await (Product.find(filters)
                                .populate({path: 'prices', select: 'price date',model: 'Price',
                                  populate: {
                                    path: 'shopId',
                                    model: 'Shop',
                                    select:'name'
                                  }}) 
                                  .sort(sortFilter)
                                  .skip(offset)
                                  .limit(perPage)
                                  .exec()))
      });
    } catch (e) {
      next(e);
    }
  
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
  const shopId = req.body.shop ;
  const  date = req.body.date ; 
  const  prix = req.body.price ;
  const shop = new mongoose.Types.ObjectId(shopId);
  const id = new mongoose.Types.ObjectId(req.params.id);
  const price = (await Price.findOne({shopId : shop , productId: id}));
   
  if(price){
    // Price contient déjà un prix pour ce produit dans ce magasin
    const oldDate = new Date(price.date);
    const newDate = new Date(date);
    if(oldDate < newDate){
      // la date dans la requête est plus récente donc on procède à un mise à jour du prix
      let newvalues = {
        user: req.user,
        price : prix, 
        date : newDate
      };
      try{

     
      (await Price.findOneAndUpdate({"_id": price._id},newvalues)
      .then(price => res.json(price))
      .catch(next));
    }catch(e){
      next(e);
    }
      // on calcule le nouveau prix moyen
      const id = new mongoose.Types.ObjectId(req.params.id);
      const priceavg =  (await Price.aggregate([
        {
        $match : { "productId" : id }
        },
        {$group : {"_id" : "$productId", "avg" : {$avg :"$price"} }} 
      ]));
      // mise à jour du prix moyen
      let newprice = {
        avgPrice : priceavg[0].avg
      };
      try {
        (await Product.findOneAndUpdate({"_id": id},newprice).then(product => res.json(product)).catch(next));
      }catch (e) {
        next(e);
      }   
    }else{
      // la date qui existe déjà est la plus recente
      res.status(304).send('error  le prix n est pas modifié ');
      next(res);
    }
  }else {
    const id = new mongoose.Types.ObjectId(req.params.id);

   // il n'y a pas de prix de ce produit dans ce magasin donc on doit le creer 
    Price.create({
      shopId: shopId,
      productId : id,
      user: req.user,
      price: prix,
      date:date
    },function(err,price){
      if(!err){
        
        Product.findOneAndUpdate({
          _id: req.params.id
        }, {
          '$push': {
              prices : price._id
        }
        })
        .catch(next);
      }
    }
    );
     // on calcule le nouveau prix moyen
    const priceavg =  (await Price.aggregate([
      {
      $match : { "productId" : id }
      },
      {$group : {"_id" : "$productId", "avg" : {$avg :"$price"} }} 
      ]));
      // mise à jour du prix moyen
      let newprice = {
        avgPrice : priceavg[0].avg
      };
      try {
        (await Product.findOneAndUpdate({"_id": id},newprice)
        .then(product => res.json(product))
        .catch(next));
      }catch (e) {
        next(e);
      }  
    }
}
