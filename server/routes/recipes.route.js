const express = require('express');
const recipesCtrl = require('../controllers/recipes.controller');

const router = express.Router();
module.exports = router;

router.get('/', recipesCtrl.getAll);
router.get('/:id', recipesCtrl.getById);
router.post('/', recipesCtrl.create);
router.put('/:id', recipesCtrl.update);
router.delete('/:id', recipesCtrl.remove);
