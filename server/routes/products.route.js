const express = require('express');
const asyncHandler = require('express-async-handler');
const productsCtrl = require('../controllers/products.controller');
const passport = require('passport');


const router = express.Router();
module.exports = router;

router.get('/', productsCtrl.getAll);
router.get('/:id', productsCtrl.getById);
router.post('/:id/price',passport.authenticate('jwt', { session: false }),productsCtrl.editPrice);
router.put('/:id/price/:price',passport.authenticate('jwt', { session: false }), productsCtrl.editPrice);