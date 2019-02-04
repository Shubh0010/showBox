const Joi = require('joi');
const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema({                                            // Creating a schema for database
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },                      // Email id is validated to unique, so that every email in our database is unique
    password: { type: String, required: true },

})

const User = mongoose.model(`User`, userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),                                  // With email() we validate email with default email standard
        password: Joi.string().required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
