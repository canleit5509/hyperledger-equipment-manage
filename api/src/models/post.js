const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const mongoose_delete = require('mongoose-delete');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  comments: [
    {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ]
}, {timestamps: true});

postSchema.plugin(paginate);
postSchema.plugin(mongoose_delete, { deletedAt: true });
module.exports = mongoose.model('Post', postSchema);