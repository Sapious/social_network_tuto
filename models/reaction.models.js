const mongoose = require("mongoose");
const ReactionSchema = new mongoose.Schema(
    {

        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        reaction: {
            type: String,
            enum: ["like", "dislike"],
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Reaction", ReactionSchema);