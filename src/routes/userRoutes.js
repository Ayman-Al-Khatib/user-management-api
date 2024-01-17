const controller = require('../controllers/userController');
const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.put('/forgot-password', controller.forgotPassword);
router.put('/update-user', auth, controller.updateUser);
router.post('/send-verification-email', controller.sendEmailVerificationCode);
router.delete('/delete-user', auth, controller.deleteUser);
router.put('/approve-user', controller.confirmUser);

module.exports = router;
