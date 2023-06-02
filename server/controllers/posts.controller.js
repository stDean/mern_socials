const { StatusCodes } = require('http-status-codes');

const Post = require('../models/posts.model');
const User = require('../models/user.model');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const postCtrl = {
  createPost: async (req, res) => {
    const { userId } = req.user;
    const { description, picturePath } = req.body;
    const user = await User.findById(userId).select('-password');
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort('-createdAt');
    res.status(StatusCodes.CREATED).json(post);
  },
  getFeedPosts: async (req, res) => {
    const posts = await Post.find();
    res.status(StatusCodes.OK).json({ posts, nbHits: posts.length });
  },
  getUserPosts: async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(StatusCodes.OK).json({ posts, nbHits: posts.length });
  },
  updateLikePost: async (req, res) => {
    const { params: { postId }, user: { userId } } = req;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json(updatedPost);
  },
}

module.exports = postCtrl;