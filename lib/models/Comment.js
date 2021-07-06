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

commentSchema.statics.popular = function(n = 10) {
  return this.aggregate([
    { $group: { _id: '$tardyGram', totalComments: { $sum: 1 } } },
    { $sort: { totalComments: -1 } },
    { $limit: n }
  ]);
};

module.exports = mongoose.model('Comment', commentSchema);
