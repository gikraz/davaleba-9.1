const mongoose = require("mongoose");
const Joi = require("joi");

// ფილმის სქემა
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director", required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        year: Joi.number().min(1900).max(2023).required(),
        genre: Joi.string().valid("comedy", "action", "drama", "horror", "romance").required(),
        director: Joi.string().required()
    });
    return schema.validate(movie);
};

module.exports = { Movie, validateMovie };
