module.exports.isPostOwner = (req, res, next) => {
	if (req.post.author.toString() === req.verifiedUser._id) {
		next();
	} else {
		return res.status(403).json("not your Post");
	}
};
