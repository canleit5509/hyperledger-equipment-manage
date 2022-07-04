const Equipment = require('../models/equipment');
const {
    invoke,
    query
} = require('../utils/contract');

const listEquipment = async (filter, options) => {
    filter.deleted = false; // filter out deleted users
    let equipments = await Equipment.paginate(filter, options);
    equipments.data = [];
    data = [];

    for await (const equipment of equipments.docs) {
        var equipmentDetail = await query('readEquipment', equipment.id);
        data.push(JSON.parse(equipmentDetail.toString()));
    }
    equipments.data = data;

    return equipments;
}

const getUserOwnEquipments = async (userId) => {
    let equipments = await Equipment.find({
        user: userId
    });
    data = [];
    for await (const equipment of equipments) {
        var equipmentDetail = await query('readEquipment', equipment.id);
        data.push(JSON.parse(equipmentDetail.toString()));
    }
    return data;
}

const createEquipment = async (equipment) => {
    try {
        const transaction = await invoke('createEquipment', equipment);
        if (!transaction) {
            return false;
        }
        equipment.user == "" ? equipment.user = null : equipment.user;
        const newEquipment = await Equipment.create(equipment);
        return newEquipment;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getEquipmentById = async (id) => {
    try {
        const equipment = await Equipment.findById(id);
        if (!equipment) {
            return false;
        }
        var equipmentDetail = await query('readEquipment', equipment.id);
        return equipmentDetail;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const isEquipmentIdExist = async (equipmentId) => {
    try {
        const equipment = await query('readEquipment', equipmentId);
        if (!equipment) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
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
        equipment.usedBy = userId;
        const updateAt = new Date();
        const transaction = await invoke('changeEquipmentUser', equipment.equipmentId, userId, updateAt);
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

const changeEquipmentStatus = async (equipmentId, status) => {
  try {
      const equipment = await Equipment.findById(equipmentId);
      equipment.status = status;
      const updateAt = new Date();
      const transaction = await invoke('changeEquipmentUser', equipment.equipmentId, status, updateAt);
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
