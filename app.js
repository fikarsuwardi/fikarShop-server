"use strict"

if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}
// require('dotenv').config()
const cors = require("cors")
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const app = express()

const routes = require('./routes')

const port = process.env.PORT || 3000; // untuk deploy heroku

//cors
app.use(cors()) // WAJIB

//body
app.use(express.urlencoded({ extended: false }))

//json
app.use(express.json())

//menggunakan routes dari routes/index.js
app.use(routes)

// errorHandler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app 