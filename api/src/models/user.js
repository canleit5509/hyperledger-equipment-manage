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
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
    default: USER_ROLES.USER,
  },
  avatar: {
    type: String,
    default: null,
  }
}, {timestamps: true});

userSchema.plugin(paginate);
userSchema.plugin(mongoose_delete, { deletedAt: true });
/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);
module.exports = User
