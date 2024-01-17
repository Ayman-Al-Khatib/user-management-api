const jwt = require('jsonwebtoken');
const { validateAndFindUser } = require('../utils/helpers');
const _ = require('lodash');

const config = require('config');
const { handleJwtErrors } = require('../utils/helpers');

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.body.email = decoded.email;
    req.body.id = decoded._id;
    const { validationErrors, user } = await validateAndFindUser({
      req: req,
      res: res,
      //! (not check) always is currect
      //validateParams: { ..._.pick(req.body, ['email']) },
    });
    if (validationErrors) return validationErrors;
    req.user = user;

    next();
  } catch (ex) {
    handleJwtErrors(res, ex);
  }
};
