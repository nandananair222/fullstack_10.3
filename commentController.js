const Comment = require('../models/Comment');
exports.addComment = async (req, res) => {
  const { postId, text } = req.body;
  const comment = await new Comment({ post: postId, author: req.user._id, text }).save();
  const pop = await comment.populate('author','username avatarUrl').execPopulate();
  res.json(pop);
};
