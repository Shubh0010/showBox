// manages user profile

const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`);
const { User, validate } = require(`../models/user`);
const _ = require(`lodash`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const config = require(`config`)

router.post('/', async (req, res) => {
    const check = validate(req.body);
    if (check.error) return res.status(404).send(check.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(404).send("Already Registerd")

    user = new User(_.pick(req.body, [`name`, `email`, `password`]));                                               // Pick allows us to choose data in a clean way

    const salt = await bcrypt.genSalt(10)                                                                           // Used this function for more security and for lessing prone to hackers
    user.password = await bcrypt.hash(user.password, salt);                                                         // Stores hashed password in database

    const result = await user.save();

    const token = jwt.sign({ _id: user._id }, config.get(`jwtPrivateKey`));                                         // We sign the token with help of secret key in config file
    res.header(`x-auth-token`, token).send(_.pick(result, [`id`, `name`, `email`]));                                // Returning json token in http header

})

module.exports = router;
