const {
    createPost,
    getPost,
    getPosts,
    deletePost,
    updatePost,
} = require("../controllers/post.controllers");

const {
    createComment,
    getComments,
    deleteComment,
    updateComment,
    createReply,
} = require("../controllers/comment.controllers");

const {
    likePost,
    dislikePost,
    removeReaction,
} = require("../controllers/reaction.controllers");

const Post = require("../models/post.models");
const Comment = require("../models/comment.models");
const Reaction = require("../models/reaction.models");
const router = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const { isCommentOwner } = require("../middlewares/isCommentOwner");
const { isReactionOwner } = require("../middlewares/isReactionOwner");

router.param("post", async (req, res, next, postId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json("not found");
        }
        req.post = post;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.param("comment", async (req, res, next, commentId) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            res.status(404).json("not found");
        }
        req.comment = comment;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.param("reaction", async (req, res, next, reactionId) => {
    try {
        const reaction = await Reaction.findById(reactionId);
        if (!reaction) {
            res.status(404).json("not found");
        }
        req.reaction = reaction;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
});
//post routes
router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.get("/:post", getPost);
router.put("/:post", verifyToken, updatePost);
router.delete("/:post", verifyToken, deletePost);
//comments routes
router.post("/:post/comments", verifyToken, createComment);
router.get("/:post/comments", getComments);
router.post("/:post/comments/:comment", verifyToken, createReply);
router.put("/:post/comments/:comment", verifyToken, isCommentOwner, updateComment);
router.delete("/:post/:comment", verifyToken, isCommentOwner, deleteComment);
// reactions routes
router.get("/:post/like", verifyToken, likePost);
router.get("/:post/dislike", verifyToken, dislikePost);
router.delete("/:post/:reaction", verifyToken, isReactionOwner, removeReaction);

module.exports = router;
