const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');
const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  class_name: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'teacher'],
    default: 'student',
  },
  avatar: {
    type: String,
    default: null,
  },
  joined_classrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  }],
  created_classrooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  }],
}, {timestamps: true});

accountSchema.plugin(paginate);
accountSchema.plugin(mongoose_delete, { deletedAt: true });
/**
 * @typedef Account
 */
const Account = mongoose.model('Account', accountSchema);
module.exports = Account
