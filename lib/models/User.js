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

module.exports = mongoose.model('User', userSchema);

// it('GET all tardyGrams', async() => {
//   return request(app)
//     .get('/api/v1/teddyGrams')
//     .then(res => {
//       expect(res.body).toEqual({ 
//         photoUrl: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//         caption: 'its a cat',
//         tags: ['#yellow', '#tabby']
//       });
//     });
// });