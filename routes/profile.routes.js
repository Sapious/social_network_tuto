const {
    getProfile,
    updateProfile,
    getMyProfile,
} = require("../controllers/profile.controllers");
const { isProfileOwner } = require("../middlewares/isProfileOwner");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();
const Profile = require("../models/profile.models");
const User = require("../models/user.models");

router.param("profile", async (req, res, next, profileId) => {
    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            res.status(404).json("not found");
        }
        req.profile = profile;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.param("user", async (req, res, next, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json("not found");
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get("/:user/:profile", getProfile);
router.get("/:user/me", verifyToken, getMyProfile);
router.put("/:user/:profile", verifyToken, isProfileOwner, updateProfile);


module.exports = router;
