const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require('multer')

dotenv.config();
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

app.use("/images", express.static(path.join(__dirname, "images"))); // to serve static images

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/ jpg'
  ) {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // a middleware for body-parser for content-type of application/json
app.use(multer({fileFilter:fileFilter, storage: fileStorage}).single('image'))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // to set a header for Access-Control-Allow-Origin to prevent CORS errors
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use(authRoutes)

app.use((error, req, res, next) => {  // to handle all errors
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
