const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePhotoUrl: String,
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(clearPassword) {
  this.passwordHash = bcrypt.hashSync(clearPassword);
});

userSchema.methods.compare = function(clearPassword) {
  return bcrypt.compareSync(clearPassword, this.passwordHash);
};

userSchema.methods.authToken = function() {
  const token = jwt.sign(this.toJSON(), process.env.APP_SECRET, { expiresIn: '25h' });
  return token;
};

userSchema.statics.findByToken  = function(token) {
  const payload = jwt.verify(token, process.env.APP_SECRET);

  return this
    .findOne({ email: payload.email });
};

userSchema.statics.prolific = function(n = 10) {
  return this.model('TardyGram').aggregate([
    { $group: { _id: '$user', totalGrams: { $sum: 1 } } },
    { $sort: { totalGrams: -1 } },
    { $limit: n }
  ]);
};

userSchema.statics.leader = function(n = 10) {
  return this.model('Comment').aggregate([
    { $group: { _id: '$commentBy', totalCommentsMade: { $sum: 1 } } },
    { $sort: { totalCommentsMade: -1 } }, 
    { $limit: n }]);
};

// [{$group: {
  _id: '$tardyGram',
  totalComments: { $sum: 1 }
}}, {$lookup: {
  from: 'tardygrams',
  localField: '_id',
  foreignField: '_id',
  as: 'tardygrams'
}}, {$unwind: {
  path: '$tardygrams'
}}, {$group: {
  _id: '$tardygrams.user',
  commentsOnUserGrams: { $sum: '$totalCommentsForGram '}
}}, {$sort: {
  commentsOnUserGrams: -1
}}]



module.exports = mongoose.model('User', userSchema);
