const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

// create the express app & enable form parsing for POST and PUT requests
const app = express()
app.use(bodyParser.json())

// enable .env in dev mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// enable cors for client site
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS"
}))

// db connection
mongoose.connect(process.env.DATABASE_URL, {
}).then((res) => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Connection Error: ' + err)
})

// controller reference
const employers = require('./controllers/employers')
app.use('/api/employers', employers)

// start server & make public
app.listen(3000)
module.exports = app