const _ = require('lodash');
const status = 'success';

exports.sign = ({ res, authToken, details }) => {
  return res
    .status(200)
    .header('x-auth-token', authToken)
    .json({
      status: status,
      details: _.pick(details, ['_id', 'name', 'email']),
    });
};
exports.sendEmail = ({ res, message = 'Verification code sent successfully' }) => {
  return res.status(200).json({
    status: status,
    details: message,
  });
};
exports.passwordResetSuccessfully = ({ res, message = 'Password reset successfully' }) => {
  return res.status(200).json({ status: status, details: message });
};
exports.userDeletedSuccessfully = ({ res, message = 'User deleted successfully' }) => {
  return res.status(200).json({ status: status, details: message });
};

exports.userApproved = async ({ res, message = 'Your user account has been approved successfully.' }) => {
  return res.status(200).json({
    status,
    details: message,
  });
};
