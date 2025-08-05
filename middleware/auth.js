const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "couldn't fetch token"
            });
        }
        //verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(403).json({
            success: false,
            message: "Invalid token. Access denied"
        });
    }
}