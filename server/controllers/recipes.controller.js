const Recipe = require('../models/recipe.model');
const RecipeComment = require('../models/recipe-comment.model');
const nlpHelper = require('../helpers/nlp.helper');

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getRecipeProducts,
  addComment,
  getComments
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const keywords = req.query.q;

  const validSortBy = {
    name,
    'created': 'createdAt',
    'updated': 'updatedAt',
    comments,
    rating
  };
  const sortBy = validSortBy[req.query.s] || Object.values(validSortBy)[0];
  const sortOrder = req.query.o === 'asc' ? 1 : -1;

  const filterParams = {};
  if (keywords) {
    filterParams.name = { $regex: new RegExp(keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') };
  }

  const totalResults = (await Recipe.countDocuments(filterParams));

  const offset = (page - 1 ) * perPage;
  try {
    return res.json({
      totalResults: totalResults,
      totalPages: Math.ceil(totalResults / perPage),
      results: await Recipe
        .find(filterParams)
        .skip(offset)
        .limit(perPage)
        .select('-comments')
        .populate('comments.user', '_id fullname')
        .populate('user', '_id fullname')
        .populate('products', '_id name score avgPrice')
        .sort({ [sortBy]: sortOrder })
        .exec()
    });
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    return res.json(await Recipe
      .findById(req.params.id)
      .populate('comments.user', '_id fullname')
      .populate('user', '_id fullname')
      .populate('products', '_id name score avgPrice')
      .exec()
    );
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const { name, text } = req.body;
  const image = req.file;
  const products = (await nlpHelper.getProductsFromRecipeText(text)).map(product => {
    return product._id;
  });
  const recipeData = {
    name,
    text,
    user: req.user,
    products
  };
  if (image) {
    recipeData.image_url = `${req.protocol}://${req.host}/${req.file.path}`;
    recipeData.image_front_url = `${req.protocol}://${req.host}/${req.file.path}`;
  }
  Recipe.create(recipeData)
  .then(recipe => res.json(recipe))
  .catch(next);
}

async function update(req, res, next) {
  const { name, text } = req.body;
  const image = req.file;
  const products = (await nlpHelper.getProductsFromRecipeText(text)).map(product => {
    return product._id;
  });
  const recipeData = {
    name,
    text,
    products
  };
  if (image) {
    recipeData.image_url = `${req.protocol}://${req.host}/${req.file.path}`;
    recipeData.image_front_url = `${req.protocol}://${req.host}/${req.file.path}`;
  }
  Recipe.updateOne({
    _id: req.params.id,
    user: req.user
  }, recipeData)
  .then(recipe => res.json(recipe))
  .catch(next);
}

async function remove(req, res, next) {
  Recipe.deleteOne({
    _id: req.params.id,
    user: req.user
  })
  .then(() => res.status(204)) // 204 No Content
  .catch(next);
}

async function getRecipeProducts(req, res, next) {
  let recipeText = '';
  if (req.params.id) {
    const recipe = Recipe.findById(req.params.id);
    recipeText = recipe.text;
  } else {
    recipeText = req.body.content;
  }
  return res.json({ products: await nlpHelper.getProductsFromRecipeText(recipeText) });
}

async function addComment(req, res, next) {
  const { content } = req.body;

  Recipe.findOneAndUpdate({
    _id: req.params.id
  }, {
    '$push': {
      comments: new RecipeComment({
        user: req.user._id,
        content,
      })
    }
  }, {
    new: true
  })
  .then(recipe => res.json(recipe))
  .catch(next);
}

async function getComments(req, res, next) {
  try {
    return res.json(await Recipe
      .findById(req.params.id)
      .select('-_id comments')
      .populate('comments.user', '_id fullname')
      .exec()
    );
  } catch (e) {
    next(e);
  }
}
