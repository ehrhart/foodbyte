const express = require('express');
const asyncHandler = require('express-async-handler');
const shopsCtrl = require('../controllers/shops.controller');

const router = express.Router();
module.exports = router;

router.get('/', shopsCtrl.getAll);
router.get('/:id', shopsCtrl.getById);