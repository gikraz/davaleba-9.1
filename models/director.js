const mongoose = require("mongoose");
const Joi = require("joi");

const directorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 18, max: 120 }
});

const Director = mongoose.model("Director", directorSchema);

const validateDirector = (director) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().min(18).max(120).required()
    });
    return schema.validate(director);
};

module.exports = { Director, validateDirector };
