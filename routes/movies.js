const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie");
const Director = require("../models/director");
const verifyDirector = require("../middlewares/verifyDirector");


router.post("/", verifyDirector, async (req, res) => {
    try {
        const { error } = validateMovie(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const directorId = req.header("director-id");
        const director = await Director.findById(directorId);
        if (!director) return res.status(404).json({ error: "🎬 რეჟისორი ვერ მოიძებნა!" });

        const movie = new Movie({
            ...req.body,
            director: directorId
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const { genre, year } = req.query;
        let filter = {};

        if (genre) {
            filter.genre = genre;
        }
        if (year) {
            filter.year = year;
        }

        const movies = await Movie.find(filter).populate("director");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
