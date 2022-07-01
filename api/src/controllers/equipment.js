const services = require('../services');

const getEquipment = async (req, res) => {
    const {
        id
    } = req.params;
    const equipment = await services.equipment.getEquipmentById(id);
    if (!equipment) {
        return res.status(404).json({
            message: 'Equipment not found'
        });
    }
    return res.status(200).json(equipment);
}

const createEquipment = async (req, res) => {
}

module.exports = {
    getEquipment
}
