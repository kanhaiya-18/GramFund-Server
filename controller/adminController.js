const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { options } = require("../routes/fundRoutes");
require("dotenv").config();
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "fill the details correctly"
            });
        }
        //check if user is in db or not
        const user = await admin.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email doesn't exists"
            });
        }
        // console.log("user: ",user);
        // console.log(password);
        //match the password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "incorrect password"
            });
        }
        const payload = {
            id: user._id
        }
        //jwt creation (token)
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "100min"
        });
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 100 * 60 * 1000 })
        res.status(200).json({
            success: true,
            message: "logged in successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}