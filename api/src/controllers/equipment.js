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
    try {
        const equipment = await services.equipmentService.createEquipment(req.body);
        if (!equipment) {
            return res.status(400).json({
                message: 'Something went wrong'
            });
        }
        return res.status(201).json(equipment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const listEquipment = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
            filter
        } = req.query;
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        };
        const equipments = await services.equipmentService.listEquipment(filter, options);
        return res.status(200).json(equipments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const updateEquipment = async (req, res) => {
    try {
        const id = req.params.id;
        const equipment = await services.equipmentService.updateEquipmentById(id, req.body);
        if (!equipment) {
            return res.status(404).json({
                message: 'Equipment not found'
            });
        }
        return res.status(200).json(equipment);
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const changeEquipmentStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const equipment = await services.equipmentService.changeEquipmentStatusById(id, status);
        if (!equipment) {
            return res.status(404).json({
                message: 'Equipment not found'
            });
        }
        return res.status(200).json(equipment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const changeEquipmentUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;
        const equipment = await services.equipmentService.changeEquipmentUserById(id, userId);
        if (!equipment) {
            return res.status(404).json({
                message: 'Equipment not found'
            });
        }
        return res.status(200).json(equipment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',  
        });
    }
}

module.exports = {
    getEquipment,
    createEquipment,
    listEquipment,
    updateEquipment,
    changeEquipmentStatus,
    changeEquipmentUser
}
