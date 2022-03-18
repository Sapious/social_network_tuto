const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        cover: { type: String },
        birthday: { type: Date },
        bio: { type: String },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Profile", ProfileSchema);
