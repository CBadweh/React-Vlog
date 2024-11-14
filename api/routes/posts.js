const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save(); // Save new Post in DB
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        // Find the Post by id
        const post = await Post.findById(req.params.id);
        // Validate User ID
        if (post.username === req.body.username) {
            try {
                // PUT Method to update user's post 
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        // Find post by ID
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    // query the user and categories
    const username = req.query.user; // "/?user=value"
    const catName = req.query.cat;   // "/?cat=value"
    try {
        let posts;
        // Retrive all the post from the specified user
        // Else retrive all the post from the specified categories
        // Else fetch all posts
        if (username) {
            posts = await Post.find({ username });
        }else if (catName) {
            posts = await Post.find({
                // in the categories array, find the value with catName in it
                categories: {
                    $in: [catName], 
                },
            });
        } else {
            posts = await Post.find();
            console.log("get all posts")
            console.log(posts)
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;