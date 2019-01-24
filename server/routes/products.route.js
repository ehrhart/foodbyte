const express = require('express');
const asyncHandler = require('express-async-handler');
const productsCtrl = require('../controllers/products.controller');

const router = express.Router();
module.exports = router;

router.get('/', productsCtrl.getAll);
router.get('/:id', productsCtrl.getById);