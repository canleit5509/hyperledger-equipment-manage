const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const EQUIPMENT_STATUS = require('../const/equipmentStatus');
const EQUIPMENT_TYPE = require('../const/equipmentType');

const equipmentSchema = new mongoose.Schema({
  equipmentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [EQUIPMENT_STATUS.AVAILABLE, EQUIPMENT_STATUS.IN_USE, EQUIPMENT_STATUS.LOST, EQUIPMENT_STATUS.REPAIRING, EQUIPMENT_STATUS.UNAVAILABLE],
    default: EQUIPMENT_STATUS.AVAILABLE,
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    enum: [...EQUIPMENT_TYPE],
    required: true,
  }, 
}, {timestamps: true});

equipmentSchema.plugin(paginate);
equipmentSchema.plugin(mongoose_delete, { deletedAt: true });
/**
 * @typedef Equipment
 */
const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment
