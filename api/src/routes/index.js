const userRoute = require('./auth');
const authorization = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const { query, invoke } = require('../utils/contract');
const services = require('../services');
function routes(app) {
  
  app.use('/api/auth', userRoute);
  app.use('/api/user', require('./user'));
  app.get('/', async (req, res) => {
    // const result = await query('appUser','queryAllEquipments');
    // res.status(200).json(JSON.parse(result.toString()));
    const result = await services.userService.queryDeletedUser({}, {
    });
    res.status(200).json(result);
  });
}

module.exports = routes;
