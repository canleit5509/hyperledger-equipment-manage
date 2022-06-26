const express = require('express');

const router = express.Router();

const accountController = require('../controllers/account');
const {
  validator,
  checkRegister,
  checkAvatar,
  checkProfile,
  checkPassword,
} = require('../middlewares/validator');
const permit = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
// Public routes
router.post('/register', checkRegister(), validator, accountController.register);
router.post('/login', checkRegister(), validator, accountController.login);

// Private routes
router.get('/me', isAuth, accountController.getProfile);
router.put('/me', isAuth, checkProfile(), validator, accountController.updateProfile);
router.put('/me/password', isAuth, checkPassword(), validator, accountController.updatePassword);
router.put('/me/avatar', isAuth, checkAvatar(), validator, accountController.updateAvatar);
// Admin routes
router.get('/', isAuth, permit('admin'), accountController.getAllAccounts);
module.exports = router;
