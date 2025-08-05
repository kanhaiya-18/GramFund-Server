//file to connect express with mongodb
const mongoose = require("mongoose");

require("dotenv").config();

const db_connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("connected successfully");
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        })
}
module.exports = db_connect;