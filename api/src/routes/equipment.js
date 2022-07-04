const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const {
  validator,
  checkRegister,
  checkAvatar,
  checkProfile,
  checkPassword,
  checkEquipment
} = require('../middlewares/validator');
const permit = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const USER_ROLES = require('../const/userRoles');
// Public routes
router.put('/:id/status', isAuth, controllers.equipmentController.changeEquipmentStatus);
router.put('/:id/user', isAuth, controllers.equipmentController.changeEquipmentUser);
router.get('/me', isAuth, controllers.equipmentController.getOwnEquipments);
router.get('/user/:id', isAuth, controllers.equipmentController.getUserOwnEquipments);
router.get('/:id', isAuth, controllers.equipmentController.getEquipment);
router.put('/:id', isAuth, checkEquipment(), validator, controllers.equipmentController.updateEquipment);
router.post('/', isAuth, checkEquipment(), validator, controllers.equipmentController.createEquipment);
router.get('/', isAuth, controllers.equipmentController.listEquipment);

module.exports = router;
