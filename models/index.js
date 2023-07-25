const User = require('./User')
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

// await User.sync({ force: true });
// await Post.sync({ force: true });
// await Comment.sync({ force: true });

module.exports = { User, Post, Comment };