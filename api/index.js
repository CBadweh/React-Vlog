const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json()); // allow json 
// allow React component to access and use the api/image folder for the URL in component/Post.jsx
app.use("/images", express.static(path.join(__dirname, "/images")));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Storage for image folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // cb for callback function incase of error
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // send file to React App in client folder using req.body.name
  },
});

// Upload the file
const upload = multer({ storage: storage }); // config the storage above
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// routes -> api/routes/
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running")
})