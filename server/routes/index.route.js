const express = require('express');
const productsRoutes = require('./products.route');
const recipesRoutes = require('./recipes.route');
const shopsRoutes = require('./shops.route');
const authRoutes = require('./auth.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/recipes', recipesRoutes);
router.use('/shops', shopsRoutes);

module.exports = router;
