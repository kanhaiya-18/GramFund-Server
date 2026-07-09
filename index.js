const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}));

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
