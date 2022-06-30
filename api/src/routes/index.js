const accountRoutes = require('./account');
const classroomRoutes = require('./classroom');
const authorization = require('../middlewares/authorization');
const isAuth = require('../middlewares/authentication');
const { query, invoke } = require('../utils/contract');
function routes(app) {
  app.get('/', async (req, res) => {
    const result = await query('appUser','queryAllEquipments');
    res.status(200).json(JSON.parse(result.toString()));
  });
  app.get('/create', async (req, res) => {
    const equipment = {
      id: 'PC_03',
      name: 'Cans PC',
      type: 'Laptop',
      status: 'unavailable',
      user: 'LE',
      buyTime: '2019-01-01',
      price: '200000000',
      model: 'Dell XPS',
      serialNumber: '1234567890',
      supplier: 'Dell',
      createdAt: Date.now(),
      updatedAt: Date.now(),
  }
    const result = await invoke('appUser','changeEquipmentStatus', equipment);
    res.status(200).json(JSON.parse(result.toString()));
  })

  app.use('/api/account', accountRoutes);
  app.use('/api/classroom', classroomRoutes);
}

module.exports = routes;
