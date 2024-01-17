const { sendVerificationCode } = require('../utils/helpers');

const status = 'failure';

exports.userNotFound = ({ res, message = 'No user with this email exists in the database.' }) => {
  return res.status(404).json({
    status: status,
    errors: 'User not found.',
    details: message,
  });
};

exports.validationErrors = ({ res, validationErrors, message = 'Please check the input data and try again.' }) => {
  return res.status(400).json({
    status: status,
    errors: validationErrors,
    details: message,
  });
};

exports.userIsFound = ({ res, message = 'A user with this email already exists in the database.' }) => {
  return res.status(400).json({
    status: status,
    errors: 'User already registered.',
    details: message,
  });
};

exports.invalidEmailOrPassword = ({ res, message = 'Invalid email or password.' }) => {
  return res.status(400).json({ status: status, details: message });
};

exports.invalidPassword = ({ res, message = 'Invalid password.' }) => {
  return res.status(400).json({ status: status, details: message });
};
exports.verifyCodeIsIncorrect = ({ res, message = 'Verify code is incorrect' }) => {
  return res.status(401).json({ status: status, details: message });
};

exports.userNotApproved = async ({
  res,
  user,
  message = 'Your user account has not been approved yet. Please contact support for assistance.',
}) => {
  await sendVerificationCode({ user: user });
  return res.status(403).json({
    status: status,
    message: message,
    details:
      'An email with a verification code has been sent to your registered email address. Please use the code to verify your account.',
  });
};

exports.verificationCodeNotSent = async ({
  res,
  message = 'Verification code could not be sent. Please try again later.',
}) => {
  return res.status(400).json({
    status: status,
    details: message,
  });
};

exports.noChangesMade = ({
  res,
  message = 'No changes were made as the provided data either matches the existing records or no new data was provided.',
}) => {
  return res.status(401).json({ status: status, details: message });
};
