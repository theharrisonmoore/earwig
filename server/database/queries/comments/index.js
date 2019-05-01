const Comment = require("./../../models/Comment");

module.exports.createComment = data => Comment.create(data);
