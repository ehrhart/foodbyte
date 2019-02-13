const nlp = require('compromise');
const Product = require('../models/product.model');
const Recipe = require('../models/recipe.model');
const RecipeComment = require('../models/recipe-comment.model');

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  parseProducts,
  addComment,
  getComments
};

async function getAll(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.max(0, Math.min(200, parseInt(req.query.per_page) || 20));
  const keywords = req.query.q;

  const filterParams = {};
  if (keywords) {
    filterParams.name = { $regex: new RegExp(keywords.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') };
  }

  const offset = (page - 1 ) * perPage;
  try {
    return res.json(await Recipe
      .find(filterParams)
      .skip(offset)
      .limit(perPage)
      .select('-comments')
      .populate('comments.user', '_id fullname')
      .populate('user', '_id fullname')
      .exec()
    );
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
      .exec()
    );
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const { name, text } = req.body;
  Recipe.create({
    name,
    text,
    user: req.user
  })
  .then(recipe => res.json(recipe))
  .catch(next);
}

async function update(req, res, next) {
  Recipe.updateOne({
    _id: req.params.id,
    user: req.user
  }, {
    name,
    text
  })
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

async function parseProducts(req, res, next) {
  const lexicon= {};

  let recipeText = '';
  if (req.params.id) {
    const recipe = Recipe.findById(req.params.id);
    recipeText = recipe.text;
  } else {
    recipeText = req.body.text;
  }

  const products = await Product.find();
  products.forEach(product => {
    if (product.name) {
      lexicon[product.name] = 'Product'; // Singular form
      lexicon[nlp(product.name).tag('Singular').nouns().toPlural().out()] = 'Product'; // Plural form
    }
  });

  doc = nlp(recipeText, lexicon);
  const out = doc.match('#Product');
  return res.json(out.out('offset'));
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
