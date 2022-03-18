const router = require("express").Router();
const User = require("../models/user.models");
const Profile = require("../models/profile.models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");

router.get("/check", verifyToken, async (req, res) => {
    // check user token validation on request

    try {
        const user = await User.findById(req.verifiedUser._id);
        if (!user) {
            return res.status(404).json("not found user");
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(422).json("email already exist");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
    try {
        
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newProfile = new Profile();
        const savedProfile = await newProfile.save();
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            number: req.body.number,
            password: hashedPassword,
            profile: savedProfile
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong Email/Password");
        }
        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isValidPassword) {
            return res.status(401).json("Wrong Email/Password");
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, profile: user.profile},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2 days",
            }
        );

        return res.status(200).json({ user: user, token });
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;