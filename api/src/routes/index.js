const userRoute = require('./user');
const authorization = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const { query, invoke } = require('../utils/contract');
function routes(app) {
  
  app.use('/api/auth', userRoute);
  app.get('/', async (req, res) => {
    const result = await query('appUser','queryAllEquipments');
    res.status(200).json(JSON.parse(result.toString()));
  });
}

module.exports = routes;
