const express = require('express');
const router = express.Router();

const { getUser, getUserFriends, addRemoveUser } = require('../controllers/user.controller');

router.route('/:id').get(getUser);
router.route('/:id/friends').get(getUserFriends);
router.route('/:id/:friendId').patch(addRemoveUser)

module.exports = router;