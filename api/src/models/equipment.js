const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');


const equipmentSchema = new mongoose.Schema({

}, {timestamps: true});

equipmentSchema.plugin(paginate);
equipmentSchema.plugin(mongoose_delete, { deletedAt: true });
/**
 * @typedef Equipment
 */
const Equipment = mongoose.model('Equipment', equipmentSchema);
module.exports = Equipment
