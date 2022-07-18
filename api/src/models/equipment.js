const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const EQUIPMENT_STATUS = require('../const/equipmentStatus');
const EQUIPMENT_TYPE = require('../const/equipmentType');

const equipmentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [EQUIPMENT_STATUS.AVAILABLE, EQUIPMENT_STATUS.IN_USE, EQUIPMENT_STATUS.LOST, EQUIPMENT_STATUS.REPAIRING, EQUIPMENT_STATUS.UNAVAILABLE],
    default: EQUIPMENT_STATUS.AVAILABLE,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: [EQUIPMENT_TYPE.PC, EQUIPMENT_TYPE.HEADPHONE, EQUIPMENT_TYPE.KEYBOARD, EQUIPMENT_TYPE.LAPTOP, EQUIPMENT_TYPE.MOUSE, EQUIPMENT_TYPE.MONITOR, EQUIPMENT_TYPE.PRINTER, EQUIPMENT_TYPE.OTHER],
    required: true,
  }, 
  name: {
    type: String,
    required: true,
  },
  buyTime: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    default: 0,
  },
  model: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  supplier: {
    type: String,
  },

}, {timestamps: true});

equipmentSchema.plugin(paginate);
equipmentSchema.plugin(mongoose_delete, { deletedAt: true });
/**
 * @typedef Equipment
 */
const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment
