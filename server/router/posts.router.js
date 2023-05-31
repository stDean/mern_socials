const express = require('express');
const router = express.Router();

const { getUserPosts, getFeedPosts, updateLikePost } = require('../controllers/posts.controller');

router.route('/').get(getFeedPosts);
router.route('/:userId').get(getUserPosts);
router.route('/like/:postId').patch(updateLikePost);

module.exports = router;