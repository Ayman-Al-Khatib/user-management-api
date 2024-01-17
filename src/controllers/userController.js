const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/userModel');
const tokenGenerator = require('../utils/tokenGenerator');
const errorResponse = require('../res/errorResponse');
const successResponse = require('../res/successResponse');
const { hashPassword, validateAndFindUser, sendVerificationCode, checkCodeIsSame } = require('../utils/helpers');

exports.signup = async (req, res) => {
  const { validationErrors } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { name: true, password: true, email: true },
    requireUser: false,
  });
  if (validationErrors) return validationErrors;
  const newUser = new User(_.pick(req.body, ['name', 'email', 'password']));
  newUser.password = await hashPassword(newUser.password);
  await sendVerificationCode({ user: newUser });
  return successResponse.sign({ res: res, details: newUser });
};

exports.signin = async (req, res) => {
  const { validationErrors, user } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { password: true, email: true },
  });
  if (validationErrors) return validationErrors;

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) return errorResponse.invalidEmailOrPassword({ res: res });
  if (user && user.approve === null) return await errorResponse.userNotApproved({ res: res, user: user });

  const authToken = tokenGenerator({ _id: user._id, email: user.email }, '1h');
  return successResponse.sign({ res: res, authToken: authToken, details: user });
};

exports.updateUser = async (req, res) => {
  const validationErrors = await validateUser({ user: req.body, ..._.pick(req.body, ['name', 'password']) });
  if (validationErrors) return errorResponse.validationErrors({ res: res, validationErrors: validationErrors });

  for (let key in _.pick(req.body, ['name'])) {
    req.user[key] = req.body[key];
  }
  if (req.password) req.user.password = await hashPassword(req.body.newPassword);
  const befor = req.user.updatedAt;
  await req.user.save();
  const after = req.user.updatedAt;
  if (befor === after) return errorResponse.noChangesMade({ res: res });
  return successResponse.sign({ res: res, details: req.user });
};

exports.sendEmailVerificationCode = async (req, res) => {
  const { validationErrors, user } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { email: true },
  });
  if (validationErrors) return validationErrors;

  await sendVerificationCode({ user: user });
  return successResponse.sendEmail({ res: res });
};

exports.forgotPassword = async (req, res) => {
  const { validationErrors, user } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { email: true, newPassword: true, verifyCode: true },
  });

  if (validationErrors) return validationErrors;
  console.log(user.verifyCode);

  const ansCheck = await checkCodeIsSame({ user: user, sendToken: req.body.verifyCode, res: res });

  if (!ansCheck) {
    user.password = await hashPassword(req.body.newPassword);
    user.approve = true;
    await user.save();
    return successResponse.passwordResetSuccessfully({ res: res });
  }
  return ansCheck;
};

exports.deleteUser = async (req, res) => {
  const { validationErrors, user } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { id: true },
  });
  if (validationErrors) return validationErrors;
  await user.deleteOne();
  return successResponse.userDeletedSuccessfully({ res: res });
};

exports.confirmUser = async (req, res) => {
  const { validationErrors, user } = await validateAndFindUser({
    req: req,
    res: res,
    validateParams: { verifyCode: true, email: true, password: true },
  });
  if (validationErrors) return validationErrors;
  const ansCheck = await checkCodeIsSame({ user: user, sendToken: req.body.verifyCode, res: res });
  if (!ansCheck) {
    await user.save();
    return successResponse.userApproved({ res: res });
  }
  return ansCheck;
};
