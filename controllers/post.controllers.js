const Post = require("../models/post.models");


const createPost = async (req, res) => {
    const newPost = new Post({
        content: req.body.content,
        image: req.body.image,
    });
    try {
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getPost = async (req, res) => {
    
    try {
        const post = req.post;
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getPosts = async (req, res) => {

    try {
        const posts = await Post.find()
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const deletePost = async (req, res) => {
    const post = req.post;
    try {
        const deletedPost = await Post.findByIdAndDelete(post._id);
        return res.status(200).json(deletedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updatePost = async (req, res) => {
    const post = req.post;

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createPost = createPost;
module.exports.getPost = getPost;
module.exports.getPosts = getPosts;
module.exports.deletePost = deletePost;
module.exports.updatePost = updatePost;
