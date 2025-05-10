const express = require("express");
const router = express.Router();
const { Director, validateDirector } = require("../models/director");

router.post("/", async (req, res) => {
    try {
        const { error } = validateDirector(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
