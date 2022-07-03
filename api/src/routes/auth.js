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

module.exports = router;
