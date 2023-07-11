const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [true, 'email đã tồn tại, vui lòng nhập email khác'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save', async function (req, res, next) {
  if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
})

userSchema.methods.correctPassword = async function(
  password,
  passwordDatabase
){
  return await bcrypt.compare(password, passwordDatabase);
}

userSchema.methods.createToken = function() {
  const randomString = crypto.randomBytes(64).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(randomString).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return randomString;
}

userSchema.methods.checkInvalidPassword = function() {
  const timeExpires = Date.parse(this.passwordResetExpires);
  console.log(timeExpires);
  console.log(Date.now());
  return Date.now() < timeExpires;
}


const User = mongoose.model('User', userSchema);

module.exports = User;
