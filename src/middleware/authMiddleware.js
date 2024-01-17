const jwt = require('jsonwebtoken');
const config = require('config');
const {handleJwtErrors} = require('../utils/helpers');
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    handleJwtErrors(res, ex);
  }
};
