const Relationship = require("../models/relationship.models");

const sendFriendRequest = async (req, res) => {
	try {
		const newRelation = new Relationship({
			sender: req.verifiedUser._id,
			receiver: req.user._id,
		});
		await newRelation.save();
		return res.status(202).json("friend request sent");
	} catch (err) {
		return res.status(500).json(err);
	}
};
const acceptFriendRequest = async (req, res) => {
	try {
		await Relationship.findByIdAndUpdate(
			req.relationship._id,
			{ status: "friends" },
			{ new: true }
		);
		return res.status(202).json("friend request accepted");
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteFriendRequest = async (req, res) => {
	try {
		await Relationship.findByIdAndDelete(req.relationship._id);
		return res.status(202).json("friend request rejected");
	} catch (err) {
		return res.status(500).json(err);
	}
};
const blockFriend = async (req, res) => {
	try {
		if (req.relationship) {
			await Relationship.findByIdAndUpdate(
				req.relationship._id,
				{ status: "blocked" },
				{ new: true }
			);
		} else {
			const newRelation = new Relationship({
				sender: req.verifiedUser._id,
				receiver: req.user._id,
				status: "blocked",
			});
			await newRelation.save();
		}
		return res.status(202).json("user blocked");
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getOwnUsersByRelationship = async (req, res) => {
	const id = req.verifiedUser._id;
	try {
		const users = await Relationship.find({
			status: req.query.status,
			$or: [{ sender: id }, { receiver: id }],
		});
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.sendFriendRequest = sendFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.deleteFriendRequest = deleteFriendRequest;
module.exports.blockFriend = blockFriend;
module.exports.getOwnUsersByRelationship = getOwnUsersByRelationship;
