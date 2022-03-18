const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        content: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        image: { type: String },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
