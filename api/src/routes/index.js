const accountRoutes = require('./account');
const classroomRoutes = require('./classroom');
const authorization = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const { query } = require('../utils/contract');
function routes(app) {
  app.get('/', async (req, res) => {
    const result = await query('appUser','queryAllEquipments');
    console.log(result);
    res.send(result);
  });

  app.use('/api/account', accountRoutes);
  app.use('/api/classroom', classroomRoutes);
}

module.exports = routes;
