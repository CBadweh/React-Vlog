const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



//REGISTER
router.post("/register", async (req, res) => {
  try {
    // hide password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // create new user with models/User.js Schema
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass, 
    });
    // Saving the user using mongoose
    const user = await newUser.save();  
    // response with user info
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Find the username in MongoDB
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!"); // No user found
    // Validate Password
    const validated = await bcrypt.compare(req.body.password, user.password); // compared the password enter with the hased password
    !validated && res.status(400).json("Wrong credentials!"); // Wrong password
    // using spread operator to response all values expect the password
    console.log("Logged in Success");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;