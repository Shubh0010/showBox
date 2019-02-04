// Routers to handle customers api

const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`);
const { Customer, validate } = require(`../models/customers`);
const auth = require(`../middleware/auth`)

router.get(`/`, (req, res) => {                                                                  // This router gets all the information from the databse as per query
    const promise = new Promise((resolve, reject) => {                                           // Using promise to handle communication with database  
        const customers = Customer
            .find()
            .select()
        resolve(customers);
    })
    promise.then((customers) => res.send(customers))
        .catch((error) => res.status(404).send(`Wrong ID`))
})
router.get(`/:id`, async (req, res) => {                                                         // This router gets data of a particular documents with help of an id
    const customers = await Customer
        .findById(req.params.id)
        .select()

    if (!customers) return res.status(404).send(`Wrong ID`);
    res.send(customers);

})
router.post('/', auth, async (req, res) => {                                                     // stores data into database
    const check = validate(req.body);
    if (check.error) return res.status(404).send(check.error.details[0].message)

    const customer = new Customer({                                                              // creating a new customer object with required data
        name: req.body.name,
        isGold: req.body.isGold,
        phoneNumber: req.body.phoneNumber
    })
    const result = await customer.save();
    res.send(result);
})
router.put('/:id', async (req, res) => {

    const result = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!result) return res.status(404).send(`Wrong ID`);
    res.send("Updated");
})
router.delete('/:id', auth, async (req, res) => {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send(`Wrong ID`);
    res.send("Deleted");
})

module.exports = router;