const Comment = require("../models/comment.models");

const createComment = async (req, res) => {
    const newComment = new Comment({
        content: req.body.content,
        author: req.verifiedUser._id,
        post: req.post._id,
    });
    try {
        const savedComment = await newComment.save();
        return res.status(201).json(savedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const createReply = async (req, res) => {
    const newReply = new Comment({
        content: req.body.content,
        author: req.verifiedUser._id,
        post: req.post._id,
        comment: req.comment._id,
    });
    try {
        const savedReply = await newReply.save();
        return res.status(201).json(savedReply);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deleteComment = async (req, res) => {
    const comment = req.comment;
    try {
        const deletedComment = await Comment.findByIdAndDelete(comment._id);
        return res.status(200).json(deletedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateComment = async (req, res) => {
    const comment = req.comment;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            comment._id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedComment);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createComment = createComment;
module.exports.getComments = getComments;
module.exports.deleteComment = deleteComment;
module.exports.updateComment = updateComment;
module.exports.createReply = createReply;
