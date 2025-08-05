const express = require("express");
const router = express.Router();

//import controller
const {getFund,getFundById, createFund,updateFund} = require("../controller/fundController");
const {login} = require("../controller/adminController");
const {upload} = require("../upload/uploadImg");
//import middleware
const {auth} = require("../middleware/auth");
router.post("/fund/create",auth,createFund);
router.get("/fund/get",getFund);
router.get("/fund/get/:id",getFundById);
router.patch("/fund/update/:id",upload.array('images', 5),auth,updateFund);
router.post("/admin/login",login);

module.exports = router;
