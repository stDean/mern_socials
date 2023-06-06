const { StatusCodes } = require('http-status-codes');

const User = require('../models/user.model');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const authCtrl = {
  register: async (req, res) => {
    const user = await User.create({
      ...req.body,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
  },
  login: async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('All fields must be filled.');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError('No user with this email.');
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthenticatedError('Incorrect password entered.');
    }

    const token = user.createJWT();
    
    res.status(StatusCodes.OK).json({ user, token });
  },
}

module.exports = authCtrl;