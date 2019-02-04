// This middleware help in implementing authorization to our application 

const jwt = require(`jsonwebtoken`)
const config = require(`config`)

module.exports = function (req, res, next) {
    const token = req.header(`x-auth-token`)
    if (!token) return res.status(401).send("Acess Denied")                              // If the token is not there, we don`t let manipulation in database

    try {
        const decoded = jwt.verify(token, config.get(`jwtPrivateKey`));                  // Only verified users will be able to manipulate data
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send(`Invalid Token`);
    }
}