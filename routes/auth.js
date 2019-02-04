// This route is for login of user

const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`);
const { User } = require(`../models/user`);
const _ = require(`lodash`);
const bcrypt = require(`bcryptjs`);
const Joi = require(`joi`);
const jwt = require(`jsonwebtoken`);
const config = require(`config`)

router.post('/', async (req, res) => {
    const check = validate(req.body);
    if (check.error) return res.status(400).send(check.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email")                                          // If we couldn`t find given email, we return with an error and status suggesting bad request

    //validating password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid Password")

    //JSON web token is basically long string that identifies a user, metaphorically compare it with idCard, so next time client come he nees to show password
    const token = jwt.sign({ _id: user._id }, config.get(`jwtPrivateKey`));                           // we are storing id as payload and getting private key from config file
    
    res.send(token)
})

function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;