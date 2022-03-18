const Reaction = require("../models/reaction.models");

const likePost = async (req, res) => {
    const like = new Reaction({
        author: req.verifiedUser._id,
        post: req.post._id,
        reaction: "like",
    });
    try {
        await like.save();
        return res.status(202)
    } catch (err) {
        return res.status(500).json(err);
    }
};
const dislikePost = async (req, res) => {
    const dislike = new Reaction({
        author: req.verifiedUser._id,
        post: req.post._id,
        reaction: "dislike",
    });
    try {
        await dislike.save();
        return res.status(202)
    } catch (err) {
        return res.status(500).json(err);
    }
};

const removeReaction = async (req, res) => {
    const reaction = req.reaction
    try {
        await Reaction.findByIdAndDelete(reaction._id)
        return res.status(202)
    } catch (err) {
        return res.status(500).json(err)
    }

}

module.exports.likePost = likePost;
module.exports.dislikePost = dislikePost;
module.exports.removeReaction = removeReaction;
