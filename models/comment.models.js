const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
    {
        content: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);