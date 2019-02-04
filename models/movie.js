const Joi = require('joi');
const mongoose = require(`mongoose`);

const movieSchema = mongoose.Schema({                                                                     // Creating a schema for database
    name: { type: String, required: true },
    genres: {                                                                                             // Custom validator-> atleast one genre of the movie should be there
        type: [String],
        validate: {
            validator: function (value) { return value && value.length > 0 },
            message: `The movie should have atleast one genre`
        }
    },
    numberOfCasts: Number,
    isReleased: { type: Boolean, required: true },
    release_Date: {
        type: String,
        required: function () { return this.isReleased }                                                   // Only required is it is released
    }
})

const Movie = mongoose.model(`Movie`, movieSchema);

function validateMovie(movie) {                                                                            // Validates movie on basis of any particular schema
    const schema = {
        name: Joi.string().required(),
        genres: Joi.array().required(),
        numberOfCasts: Joi.number(),
        isReleased: Joi.boolean(),
        release_Date: Joi.string()

    }
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;