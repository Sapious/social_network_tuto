const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            required: true,
        },
        number: { type: Number },
        password: { type: String },
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
