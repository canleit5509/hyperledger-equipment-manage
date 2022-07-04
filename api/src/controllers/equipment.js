const services = require('../services');

const getEquipment = async (req, res) => {
    const {
        id
    } = req.params;
    const equipment = await services.equipmentService.getEquipmentById(id);
    if (!equipment) {
        return res.status(404).json({
            message: 'Equipment not found'
        });
    }
    return res.status(200).json(equipment);
}

const createEquipment = async (req, res) => {
    try {
        // if (services.equipmentService.isEquipmentIdExist(req.body.id)) {
        //     return res.status(400).json({
        //         message: 'Equipment id already exist'
        //     });
        // }

        var data = {
            id: req.body.id,
            name: req.body.name?req.body.name:"",
            type: req.body.type?req.body.type:"",
            status: req.body.status?req.body.status:"",
            user: req.body.user?req.body.user:"",
            buyTime: req.body.buyTime?req.body.buyTime:"",
            price: req.body.price?req.body.price:"",
            model: req.body.model?req.body.model:"",
            serialNumber: req.body.serialNumber?req.body.serialNumber:"",
            supplier: req.body.supplier?req.body.supplier:"",
            createdAt: req.body.createdAt?req.body.createdAt:Date.now(),
            updatedAt: req.body.updatedAt?req.body.updatedAt:Date.now(),
        }
        const equipment = await services.equipmentService.createEquipment(data);
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
        } = req.query;
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        };
        const filter = req.body.filter ? req.body.filter : {};
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
        const _id = req.params.id;
        if (!services.equipmentService.isEquipmentIdExist(req.body.id)) {
            return res.status(404).json({
                message: 'Equipment is not exist'
            });
        }
        var data = {
            id: req.body.id,
            name: req.body.name?req.body.name:"",
            type: req.body.type?req.body.type:"",
            status: req.body.status?req.body.status:"",
            user: req.body.user?req.body.user:"",
            buyTime: req.body.buyTime?req.body.buyTime:"",
            price: req.body.price?req.body.price:"",
            model: req.body.model?req.body.model:"",
            serialNumber: req.body.serialNumber?req.body.serialNumber:"",
            supplier: req.body.supplier?req.body.supplier:"",
            createdAt: req.body.createdAt?req.body.createdAt:Date.now(),
            updatedAt: req.body.updatedAt?req.body.updatedAt:Date.now(),
        }
        
        const equipment = await services.equipmentService.updateEquipmentById(_id, data);
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
        if (!services.equipmentService.isEquipmentIdExist(req.body.id)) {
            return res.status(404).json({
                message: 'Equipment is not exist'
            });
        }
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
        if (!services.equipmentService.isEquipmentIdExist(req.body.id)) {
            return res.status(404).json({
                message: 'Equipment is not exist'
            });
        }
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

const getOwnEquipments = async (req, res) => {
    try {
        const userId = req.user._id;
        const equipments = await services.equipmentService.getUserOwnEquipments(userId);
        if (!equipments) {
            return res.status(204).json({
                message: 'No equipment found'
            });
        }
        return res.status(200).json(equipments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const getUserOwnEquipments = async (req, res) => {
    try {
        const userId = req.params.id;
        const equipments = await services.equipmentService.getUserOwnEquipments(userId);
        if (!equipments) {
            return res.status(204).json({
                message: 'No equipment found'
            });
        }
        return res.status(200).json(equipments);
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
    changeEquipmentUser,
    getOwnEquipments,
    getUserOwnEquipments
}
