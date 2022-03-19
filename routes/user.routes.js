const {
	getProfile,
	updateProfile,
	getMyProfile,
} = require("../controllers/profile.controllers");
const { getOwnActivities } = require("../controllers/activity.controllers");
const {
	blockFriend,
	deleteFriendRequest,
	acceptFriendRequest,
	sendFriendRequest,
} = require("../controllers/relationships.controllers");
const { isProfileOwner } = require("../middlewares/isProfileOwner");
const { isRelationshipOwner } = require("../middlewares/isRelationshipOwner");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();
const Profile = require("../models/profile.models");
const User = require("../models/user.models");
const Relationship = require("../models/relationship.models");

router.param("profile", async (req, res, next, id) => {
	try {
		const profile = await Profile.findById(id);
		if (!profile) {
			res.status(404).json("not found");
		}
		req.profile = profile;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.param("user", async (req, res, next, id) => {
	try {
		const user = await User.findById(id);
		if (!user) {
			res.status(404).json("not found");
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.param("relationship", async (req, res, next, id) => {
	try {
		const relationship = await Relationship.findById(id);
		if (!relationship) {
			res.status(404).json("not found");
		}
		req.relationship = relationship;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});
router.get("/:user/relationships/add_friend", verifyToken, sendFriendRequest);
router.get(
	"/:user/relationships/:relationship/accept",
	verifyToken,
	isRelationshipOwner,
	acceptFriendRequest
);
router.get(
	"/:user/relationships/:relationship/reject",
	verifyToken,
	isRelationshipOwner,
	deleteFriendRequest
);
router.get("/:user/relationships/block", verifyToken, blockFriend);
router.get(
	"/:user/relationships/:relationship/block",
	verifyToken,
	isRelationshipOwner,
	blockFriend
);
router.get("/relationships", verifyToken, acceptFriendRequest);

router.get("/activities/me", verifyToken, getOwnActivities);
router.get("/:user/profile", getProfile);
router.get("/profile/me", verifyToken, getMyProfile);
router.put("/:user/:profile", verifyToken, isProfileOwner, updateProfile);

module.exports = router;
