const Activity = require("../models/activity.models");

module.exports = async (req, res, next) => {
	const activity = res.activity;
	try {
		const newActivity = new Activity({
			user: req.verifiedUser._id,
			activity: activity.id,
			action: activity.action,
			activityModel: activity.model,
		});
		await newActivity.save();
	} catch (err) {
		console.log(err);
	} finally {
		next();
	}
};
