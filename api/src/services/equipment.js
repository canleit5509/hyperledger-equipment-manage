const Equipment = require('../models/equipment');
const {
    invoke,
    query
} = require('../utils/contract');

const listEquipment = async (filter, options) => {
    filter.deleted = false; // filter out deleted users
    let equipments = await Equipment.paginate(filter, options);

    return equipments;
}

const getUserOwnEquipments = async (userId) => {
    data = await query(userId);
    
    return data;
}

const createEquipment = async (equipment) => {
    try {
        const newEquipment = await Equipment.create(equipment);
        return newEquipment;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getEquipmentById = async (id) => {
    try {
        return equipment = await Equipment.findById(id);
    } catch (err) {
        console.log(err);
        return false;
    }
}

const isEquipmentIdExist = async (equipmentId) => {
    try {
        
        return true;
    } catch (err) {
        console.log(err);
        return true;
    }
}
const updateEquipmentById = async (id, equipmentUpdate) => {
    try {
        const equipment = await Equipment.findById(id);
        const transaction = await invoke('updateEquipment', equipmentUpdate);
        if (!transaction) {
            return false;
        }
        Object.assign(equipment, equipmentUpdate);
        await equipment.save();
        return equipment;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteEquipmentById = async (id) => {
    const equipment = await Equipment.findById(id);
    equipment.delete();
    return equipment;
}

const changeEquipmentUser = async (equipmentId, userId) => {
    try {
        const equipment = await Equipment.findById(equipmentId);
        const transaction = await invoke( userId, equipment._id,);
        if (!transaction) {
            return false;
        }
        equipment.user = userId;
        await equipment.save();
        return equipment;
    } catch (err) {
        console.log(err);
        return false;
    }

}

const changeEquipmentStatus = async (equipmentId, status) => {
  try {
      const equipment = await Equipment.findById(equipmentId);
      equipment.status = status;
      await equipment.save();
      return equipment;
  } catch (err) {
      console.log(err);
      return false;
  }

}

module.exports = {
    listEquipment,
    getUserOwnEquipments,
    createEquipment,
    getEquipmentById,
    updateEquipmentById,
    changeEquipmentUser,
    deleteEquipmentById,
    changeEquipmentStatus,
    isEquipmentIdExist
}
