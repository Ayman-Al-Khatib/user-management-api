const _ = require('lodash');
const status = 'success';

exports.sign = ({ res, authToken, details }) => {
  let data = {};
  for (let key in details._doc) {
    if (key !== 'password') {
      data[key] = details._doc[key];
    }
  }
  data['x-auth-token'] = authToken;
  return res
    .status(200)

    .json({
      status: status,
      details: data,
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
