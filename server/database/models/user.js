const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: 'E-mail is required',
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  name: {
    type: String,
    required: 'Name is required',
    minlength: [3, 'Minimum name length is 3 characteres']
  },
  username: {
    type: String,
    required: true,
    minlength: [5, 'Minimum username length is 5 characteres']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Minimum password length is 6 characteres'],
    maxlength: [32, 'Maximum password length is 32 characteres'],
  },
  role: {
    enum: ['admin', 'page-admin', 'guest'],
    type: String,
    required: true,
    default: 'guest'
  },
  info: String,
  createdAt: {type: Date, default: Date.now},
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = function(candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function(error, isSuccess) {
    if (error) return done(error);

    return done(null, isSuccess);
  })
}


module.exports = mongoose.model('User', userSchema);
