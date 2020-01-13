const Comment = require("./../../models/Comment");

module.exports.createComment = data => Comment.create(data);
module.exports.getCommentById = id => Comment.findById(id);
