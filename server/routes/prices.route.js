const express = require('express');
const asyncHandler = require('express-async-handler');
const priceCtrl = require('../controllers/prices.controller');

const router = express.Router();
module.exports = router;

router.get('/', priceCtrl.getAll);
router.delete('/:id', priceCtrl.remove);

