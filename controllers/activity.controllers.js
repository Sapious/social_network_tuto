const Activity = require("../models/activity.models");

const getOwnActivities = async (req, res) => {
	try {
		const activities = await Activity.find({ user: req.verifiedUser._id });
		return res.status(200).json(activities);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.getOwnActivities = getOwnActivities;
