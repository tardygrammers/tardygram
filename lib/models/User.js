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
  profilePhotoURL: String,
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
    }
  }
});

userSchema.virtual('password').set(function(clearPassword) {
  this.passwordHash = bcrypt.hashSync(clearPassword);
});

userSchema.methods.authToken = function() {
  const token = jwt.sign(this.toJSON(), process.enc.APP_SECRET, { expiresIn: '25h' });
  return token;
};

userSchema.statics.findByToken  = function(token) {
  const payload = jwt.verify(token, process.env.APP_SECRET);

  return this
    .findOne({ email: payload.email });
};

module.exports = mongoose.model('User', userSchema);

