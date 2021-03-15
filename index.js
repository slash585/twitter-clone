const express = require('express')

const app = express()
const { mongoose } = require('./bootstrap')

const indexRoute = require('./routes/index')

app.set('view engine', 'pug')
app.set('views','views')


app.use('/', indexRoute)

module.exports = app