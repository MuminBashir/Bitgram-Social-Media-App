const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

//Setting cors for frontend
app.use(
  cors({
    origin: ["https://bitgram.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://bitgram.vercel.app');
  // You can specify more headers as needed
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Importing routes
const post = require("./routes/post");
const user = require("./routes/user");

// using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
