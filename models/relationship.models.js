const mongoose = require("mongoose");
const RelationshipSchema = new mongoose.Schema(
    {
        friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        relationship: {
            type: String,
            enum: ["friend", "blocked", "pending"],
            default: "pending",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Relationship", RelationshipSchema);
