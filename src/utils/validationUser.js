const yup = require('yup');
const { ObjectId } = require('mongodb'); // Import the ObjectId class from your MongoDB library

exports.name = yup
  .string()
  .trim()
  .min(3, 'Name must be at least 3 characters')
  .max(50, 'Name can be at most 50 characters')
  .required('Name is required');

exports.email = yup
  .string()
  .trim()
  .min(3, 'Email must be at least 3 characters')
  .max(255, 'Email can be at most 255 characters')
  .email('Invalid email format')
  .required('Email is required');

exports.password = yup
  .string()
  .trim()
  .min(3, 'Password must be at least 3 characters')
  .max(255, 'Password can be at most 255 characters')
  .required('Password is required');

exports.newPassword = yup
  .string()
  .trim()
  .min(3, 'Password must be at least 3 characters')
  .max(255, 'Password can be at most 255 characters')
  .required('New Password is required')
  .test('password-not-equal', 'Password and New Password must not be the same', function (value) {
    return value !== this.parent.password;
  });

exports.verifyCode = yup
  .string()
  .trim()
  .length(6, 'Verification code must be exactly 6 characters')
  .required('Verification code is required');

//! Warn [unused]
exports.approve = yup.boolean().oneOf([true], 'You must approve').required('Approval is required');

exports.id = yup
  .string()
  .required('Object ID is required')
  .test('is-objectid', 'Invalid ObjectId', (value) => ObjectId.isValid(value));
