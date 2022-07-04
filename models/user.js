require('dotenv').config();
const mongoose = require('../config/mongoDB.config');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  _id: {
    type: String,
  },
  firstname: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'firstname is required',
  },
  lastname: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'lastname is required',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'email is required',
  },
  password: {
    type: String,
    required: 'password is required',
  },
});

userSchema.methods.toJSON = function() {
  const obj = this.toObject({versionKey: false});
  delete obj.password;
  return obj;
};

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateVerificationToken = function() {
  const user = this;
  const verificationToken = jwt.sign(
      {ID: user._id, email: user.email},
      secret,
      {expiresIn: '2h'},
  );
  return verificationToken;
};

const user = mongoose.model('user', userSchema);
module.exports = user;