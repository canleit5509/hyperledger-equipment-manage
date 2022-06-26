const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
  permissions: [{
    type: mongoose.Types.ObjectId,
    ref: 'Permission',
    default: null,
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Role', roleSchema);
