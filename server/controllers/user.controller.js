const { StatusCodes } = require('http-status-codes');

const User = require('../models/user.model');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const userCtrl = {
  // get signed in user
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new BadRequestError("No User Found");
    }

    res.status(StatusCodes.OK).json(user);
  },
  getUserFriends: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new BadRequestError("No User Found");
    }

    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => (
        { _id, firstName, lastName, occupation, location, picturePath }
      )
    );

    res.status(StatusCodes.OK).json(formattedFriends);
  },
  // update
  addRemoveUser: async (req, res) => {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user) {
      throw new BadRequestError("No User Found");
    }

    if (!friend) {
      throw new BadRequestError("No Friend with that ID found.");
    }

    /**
     * if the users friends array includes friendsId filter the array and return an array excluding that friends id i.e remove the friend from the users friends list. Same for the friend.
     * else add the friend to the users friends list.
     */
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(id => id !== friendId);
      friend.friends = friend.friends.filter(id => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map(id => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => (
        { _id, firstName, lastName, occupation, location, picturePath }
      )
    );

    res.status(StatusCodes.OK).json(formattedFriends);
  },
}

module.exports = userCtrl;