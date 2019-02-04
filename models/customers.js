const Joi = require('joi');
const mongoose = require(`mongoose`);

const customerSchema = mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, required: true },
    phoneNumber: { type: Number, required: true }
})

function validateCustomer(customer) {                                    // This function is use to validate customer on basis of any provided schema
    const schema = {
        name: Joi.string().required(),
        isGold: Joi.boolean().required(),
        phoneNumber: Joi.number().required()
    }
    return Joi.validate(customer, schema)
}


const Customer = mongoose.model(`Customer`, customerSchema);             // Creating a model of certain schema

exports.Customer = Customer;
exports.validate = validateCustomer;
