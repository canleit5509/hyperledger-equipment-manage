const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const REQUEST_STATUS = require('../const/requestStatus');
const REQUEST_TYPE = require('../const/requestType');

const requestSchema = new mongoose.Schema({

    status: {
        type: String,
        enum: [REQUEST_STATUS.PENDING, REQUEST_STATUS.APPROVED, REQUEST_STATUS.REJECTED, REQUEST_STATUS.CANCELLED],
        default: REQUEST_STATUS.PENDING,
    },
    description: {
        type: String,
    },
    response: {
        type: String,
    },
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: [REQUEST_TYPE.REPAIR, REQUEST_TYPE.REPLACE, REQUEST_TYPE.RETURN, REQUEST_TYPE.LOST, REQUEST_TYPE.NEW, REQUEST_TYPE.DAMAGE, REQUEST_TYPE.OTHER],
    }

}, {
    timestamps: true
});

requestSchema.plugin(paginate);
requestSchema.plugin(mongoose_delete, {
    deletedAt: true
});
/**
 * @typedef Equipment
 */
const Request = mongoose.model('Request', requestSchema);
module.exports = Request
