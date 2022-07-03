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

router.get('/deleted', isAuth, permit(USER_ROLES.ADMIN), controllers.userController.getDeletedUsers);
router.get('/all', isAuth, permit(USER_ROLES.ADMIN), controllers.userController.getUsersWithDeleted);
router.put('/restore/:id', isAuth, permit(USER_ROLES.ADMIN), controllers.userController.restoreUser);
router.get('/:id', isAuth,  controllers.userController.getProfile);
router.put('/:id', isAuth, checkProfile(), validator, controllers.userController.updateProfile);
router.delete('/:id', isAuth, permit(USER_ROLES.ADMIN), controllers.userController.deleteUser);
router.post('/', isAuth, permit(USER_ROLES.ADMIN), checkRegister(), validator, controllers.userController.register);
router.get('/', isAuth, permit(USER_ROLES.ADMIN, USER_ROLES.MANAGER), controllers.userController.getAllUsers)

module.exports = router;
