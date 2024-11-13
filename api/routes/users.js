const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
    // ID Validation
    if (req.body.userId === req.params.id) { // req.body is from what we sent from Postman's body and req.params is from /:id (which is from the DB?)
        // hashed the password from request body from Postman 
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt); //update the pervious password in DB
        }
        try {
            console.log("try")
            // PUT request to update user info
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body, // update user using $set from MongoDB
                },
                // { new: true } // response with the new info from DB
            );
            res.status(200).json(updatedUser); // response
        } catch (err) {
            console.log("error")
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id); // Find the user ID first
            try {
                await Post.deleteMany({ username: user.username }); // delete all posts by this user
                await User.findByIdAndDelete(req.params.id);        // delete user from DB
                res.status(200).json("User has been deleted...");   // response
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // find the user in DB based on the ID
        const { password, ...others } = user._doc;       // display user info expect its password using JS spread operator
        res.status(200).json(others);                    // Response
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;