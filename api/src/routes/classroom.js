const express = require('express');

const router = express.Router();
const classroom = require('../controllers/classroom');

const isAuth = require('../middlewares/authentication');
const permit = require('../middlewares/authorization');
router.post('/join/:classroomId', isAuth, classroom.joined_classroom);
router.post('/leave/:classroomId', isAuth, classroom.leave_classroom);
router.get('/joined', isAuth,  classroom.list_joined);
router.post('/', isAuth, permit('teacher', 'admin'), classroom.create);
module.exports = router;
