const express = require('express');
const passport = require('passport');
const multer = require('multer');
const recipesCtrl = require('../controllers/recipes.controller');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();
module.exports = router;

router.get('/', recipesCtrl.getAll);
router.get('/:id', recipesCtrl.getById);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  recipesCtrl.create
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  recipesCtrl.update
);
router.delete('/:id', passport.authenticate('jwt', { session: false }), recipesCtrl.remove);
router.post('/analyze', recipesCtrl.getRecipeProducts);
router.get('/:id/products', recipesCtrl.getRecipeProducts);
router.post('/:id/comments', passport.authenticate('jwt', { session: false }), recipesCtrl.addComment);
router.get('/:id/comments', recipesCtrl.getComments);
router.put('/:id/ratings/:rating', passport.authenticate('jwt', { session: false }), recipesCtrl.addRating);
router.get('/:id/ratings', recipesCtrl.getRatings);
