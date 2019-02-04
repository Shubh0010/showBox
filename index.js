// Main file for entry into application

const express = require(`express`)
const app = express()
const genres = require('./routes/genres')
const mongoose = require(`mongoose`)
const customers = require('./routes/customers')
const users = require('./routes/user')
const auth = require('./routes/auth')
const config = require(`config`)

if (!config.get(`jwtPrivateKey`)) {                                                           // If this jwtPrivateKey env variable is not set
    console.error("No jwt Private key")
    process.exit(1);
}

mongoose.connect(`mongodb://localhost:27017/movies`, { useNewUrlParser: true })               // Connecting to movies database in MongoDB
    .then(() => console.log(`Connected to MondoDB................`))
    .catch((err) => console.log("couldn`t connect to MongoDB: ", err))

app.use(express.json());
app.use(`/myShowbox.com/api/genres`, genres)                                                  // Any api hit with this url or further will be handle by the router in next parameter            
app.use(`/myShowbox.com/api/customers`, customers)
app.use(`/myShowbox.com/api/users`, users)
app.use(`/myShowbox.com/api/auth`, auth)

const port = process.env.PORT || 3000;                                                        // If value of port is set in environment Variable it returns that else default value
app.listen(port, () => console.log(`Listening to ${port}`))