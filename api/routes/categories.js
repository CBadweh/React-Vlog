const router = require("express").Router();
const Category = require("../models/Category");

// CREATE NEW CATEGORY
router.post("/", async (req, res) => {
    const newCat = new Category(req.body); // using Category schema in models
    try {
        const savedCat = await newCat.save(); // save to DB
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;