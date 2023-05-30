const { StatusCodes } = require('http-status-codes');

const authCtrl = {
  register: async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "Created New User" })
  },
  login: async (req, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "Logged in User" })
  },
}

module.exports = authCtrl;