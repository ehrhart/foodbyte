const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(authCtrl.register), authCtrl.login);
router.post('/login', passport.authenticate('local', { session: false }), authCtrl.login);
router.get('/me', passport.authenticate('jwt', { session: false }), authCtrl.login);
