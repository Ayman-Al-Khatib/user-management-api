const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/userModel');
const errorResponse = require('../res/errorResponse');
const jwt = require('jsonwebtoken');
const codeGenerator = require('../utils/codeGenerator');
const tokenGenerator = require('../utils/tokenGenerator');
const config = require('config');
const emailService = require('../services/emailService');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

function handleJwtErrors(res, ex) {
  let errorMessage = 'An unexpected error occurred.';
  if (ex instanceof jwt.TokenExpiredError) {
    errorMessage = 'The provided token has expired.';
  } else if (ex instanceof jwt.JsonWebTokenError) {
    errorMessage = 'The provided token is invalid.';
  }
  return res.status(400).json({ status: 'failure', details: errorMessage });
}
function handleVerificationCodeErrors(res, ex) {
  let errorMessage = 'An unexpected error occurred while processing the verification code.';
  if (ex instanceof jwt.TokenExpiredError) {
    errorMessage = 'The verification code has expired.';
  }
  return res.status(400).json({ status: 'failure', details: errorMessage });
}

async function validateAndFindUser({ req, res, validateParams, requireUser = true }) {
  let validationErrors, user;
  validationErrors = await validateUser({ user: req.body, ...validateParams });
  if (validationErrors)
    validationErrors = errorResponse.validationErrors({ res: res, validationErrors: validationErrors });
  else {
    if (req.body.email) user = await User.findOne({ email: req.body.email });
    else if (req.body.id) user = await User.findById(req.body.id);

    if (user && !requireUser) validationErrors = errorResponse.userIsFound({ res: res });
    else if (!user && requireUser) validationErrors = errorResponse.userNotFound({ res: res });
  }

  return { validationErrors, user };
}

async function sendVerificationCode({ user }) {
  const code = codeGenerator(6);

  await emailService({ toEmail: user.email, verificationCode: code });
  user.verifyCode = code;
  const tokenCode = tokenGenerator({ _id: user._id, code: code }, '5m');
  user.verifyCode = tokenCode;
  await user.save();
  return user;
}
async function checkCodeIsSame({ user, sendToken, res }) {
  const token = user.verifyCode;

  if (!token) return errorResponse.verificationCodeNotSent({ res: res });
  try {
    var decodedToken = await jwt.verify(token, config.get('jwtPrivateKey'));
  } catch (ex) {
    return handleVerificationCodeErrors(res, ex);
  }
  if (decodedToken.code != sendToken) {
    return errorResponse.verifyCodeIsIncorrect({ res: res });
  } else {
    user.verifyCode = undefined;
    user.approve = new Date();
  }
  return null;
}

module.exports = {
  validateAndFindUser,
  handleJwtErrors,
  hashPassword,
  handleVerificationCodeErrors,
  sendVerificationCode,
  checkCodeIsSame,
};
