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

router.get('/:id', isAuth, controllers.requestController.getRequest);
router.post('/', isAuth, controllers.requestController.createRequest);
router.put('/:id', isAuth, controllers.requestController.updateRequest);
router.put('/:id/status', isAuth, controllers.requestController.updateRequestStatus);
router.get('/', isAuth, controllers.requestController.listRequest);

module.exports = router;
