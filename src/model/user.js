const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  role_id: {
    type: Number,
    default: 2,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  email_verified_at: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'default.png',
  },
  about: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// generate token
userSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({
      _id: this._id,
      role_id: this.role_id,
    },
    process.env.SECRET_KEY,
    {expiresIn: '1h'});
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model('User', userSchema);
module.exports = User;
