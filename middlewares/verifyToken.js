const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("access_token");
    if (!token) {
        return res.status(401).json("no token provided");
    }
    try {
        verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.verifiedUser = verifiedUser;
        next();
    } catch (err) {
        return res.status(403).json("Invalid token");
    }
};