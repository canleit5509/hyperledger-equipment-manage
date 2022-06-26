const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  }],
}, {timestamps: true});
classroomSchema.plugin(paginate);
classroomSchema.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model('Classroom', classroomSchema);