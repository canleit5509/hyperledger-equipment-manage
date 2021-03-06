const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const USER_ROLES = require('../const/userRoles');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
    default: USER_ROLES.USER,
  },
  avatar: {
    type: String,
    default: null,
  }, 
  department: {
    type: String,
    default: null,
  },
  position: {
    type: String,
    default: null,
  },
  equipments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
  }]
}, {timestamps: true});

userSchema.plugin(paginate);
userSchema.plugin(mongoose_delete, { indexFields: ['deletedAt'] });
/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);
module.exports = User
