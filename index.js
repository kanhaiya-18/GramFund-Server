const express = require("express");
const app = express();
const cors = require("cors");
//middlewares
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 5000;


//import routes
const routes = require("./routes/fundRoutes");
app.use("/api/v1",routes);

//db connection
const db_connect = require("./config/connection");
db_connect();

app.listen(PORT,(req,res) => {
    console.log(`app started at ${PORT}`);
});