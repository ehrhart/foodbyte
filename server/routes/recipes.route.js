const express = require('express');
const passport = require('passport');
const recipesCtrl = require('../controllers/recipes.controller');

const router = express.Router();
module.exports = router;

router.get('/', recipesCtrl.getAll);
router.get('/:id', recipesCtrl.getById);
router.post('/', passport.authenticate('jwt', { session: false }), recipesCtrl.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), recipesCtrl.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), recipesCtrl.remove);
router.post('/products', recipesCtrl.parseProducts);
router.get('/:id/products', recipesCtrl.parseProducts);
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), recipesCtrl.addComment);
router.get('/:id/comments', recipesCtrl.getComments);
