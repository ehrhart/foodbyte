const jwt = require('jsonwebtoken');
const config = require('../config/config');
const usersCtrl = require('./users.controller');

module.exports = {
  generateToken,
  register,
  login
}

async function register(req, res, next) {
  let user = await usersCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = generateToken(user);
  res.json({ user, token });
}

function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
