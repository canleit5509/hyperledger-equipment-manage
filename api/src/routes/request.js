const express = require('express');

const router = express.Router();

const controllers = require('../controllers');
const {
  validator,
  checkRequest,
} = require('../middlewares/validator');
const permit = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');

router.get('/:id', isAuth, controllers.requestController.getRequest);
router.post('/', isAuth, checkRequest(), validator, controllers.requestController.createRequest);
router.put('/:id', isAuth, checkRequest(), validator, controllers.requestController.updateRequest);
router.put('/:id/status', isAuth, controllers.requestController.updateRequestStatus);
router.get('/', isAuth, controllers.requestController.listRequest);

module.exports = router;
