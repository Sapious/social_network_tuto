module.exports.isRelationshipOwner = (req, res, next) => {
	if (
		req.relationship.receiver.toString() === req.verifiedUser._id ||
		req.relationship.sender.toString() === req.verifiedUser._id
	) {
		next();
	} else {
		return res.status(403).json("not your relationship");
	}
};
