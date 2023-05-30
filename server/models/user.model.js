const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your First Name is required."],
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: [true, "Your Last Name is required."],
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: [true, "A valid email is required"],
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
}, { timestamps: true });

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module, exports = mongoose.model('user', UserSchema);