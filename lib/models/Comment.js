const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: String,
  tardyGram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TardyGram',
    required: true
  } 
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Comment', commentSchema);
