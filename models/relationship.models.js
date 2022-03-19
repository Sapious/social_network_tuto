const mongoose = require("mongoose");
const RelationshipSchema = new mongoose.Schema(
    {
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: String,
            enum: ["friends", "blocked", "pending"],
            default: "pending",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Relationship", RelationshipSchema);
