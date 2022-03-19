const Profile = require("../models/profile.models");

const getProfile = async (req, res) => {
    try {
        const profile = req.user.profile;
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getMyProfile = async (req, res) => {
    const myProfileId = req.verifiedUser._id;
    try {
        const myProfile = await Profile.findById(myProfileId);
        return res.status(200).json(myProfile);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateProfile = async (req, res) => {
    const profile = req.profile;
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            profile._id,
            req.body,
            { new: true }
        );
    } catch (err) {}
};

module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;
module.exports.getMyProfile = getMyProfile;
