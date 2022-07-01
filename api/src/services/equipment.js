const Equipment = require('../models/equipment');
const User = require('../models/user');
const {
    invoke,
    query
} = require('../utils/contract');

const listEquipment = async (filter, options) => {
    options.select = options.select || '-password';
    filter.deleted = false; // filter out deleted users
    let equipments = await Equipment.paginate(filter, options);
    equipments.data = [];
    equipments.docs.forEach(equipment => {
        var equipmentDetail = query('readEquipment', equipment.equipmentId);
        equipments.data.push(JSON.parse(equipmentDetail.toString()));
    });

    return equipments;
}

const getOwnEquipment = async (userId) => {
    let equipments = await Equipment.find({
        usedBy: userId
    });
    data = [];
    equipments.forEach(equipment => {
        var equipmentDetail = query('readEquipment', equipment.equipmentId);
        data.push(JSON.parse(equipmentDetail.toString()));
    });
    return data;
}

const createEquipment = async (equipment) => {
    try {
        const transaction = await invoke('createEquipment', equipment);
        if (!transaction) {
            return false;
        }
        const newEquipment = await Equipment.create(equipment);
        return newEquipment;
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
    getOwnEquipment,
    createEquipment,
    updateEquipmentById,
    changeEquipmentUser,
    deleteEquipmentById,
    changeEquipmentStatus
}
