const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const {
  validator,
  checkRegister,
  checkAvatar,
  checkProfile,
  checkPassword,
} = require('../middlewares/validator');
const permit = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const USER_ROLES = require('../const/userRoles');
// Public routes
router.post('/register', checkRegister(), validator, controllers.userController.register);
router.post('/login', checkRegister(), validator, controllers.userController.login);
router.post('/password_change', isAuth, checkPassword(), validator, controllers.userController.changePassword);

// // Private routes
// router.get('/me', isAuth, accountController.getProfile);
// router.put('/me', isAuth, checkProfile(), validator, accountController.updateProfile);
// router.put('/me/password', isAuth, checkPassword(), validator, accountController.updatePassword);
// router.put('/me/avatar', isAuth, checkAvatar(), validator, accountController.updateAvatar);
// // Admin routes
// router.get('/', isAuth, permit('admin'), accountController.getAllAccounts);
module.exports = router;
