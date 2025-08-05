require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret :  process.env.API_SECRET
});
// console.log("Cloud Name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.API_KEY);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder : "gramfund" ,
        allowed_formats: ["jpg","png", "jpeg"]
    }
});

const upload = multer({storage});
module.exports = {upload,cloudinary};

