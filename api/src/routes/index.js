const accountRoutes = require('./account');
const classroomRoutes = require('./classroom');
const authorization = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');

function routes(app) {
  app.get('/', isAuth, authorization('admin'), (req, res) => {
    res.send(req.user);
  });

  app.use('/api/account', accountRoutes);
  app.use('/api/classroom', classroomRoutes);
}

module.exports = routes;
