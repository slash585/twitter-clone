const express = require('express')

const app = express()
const { mongoose } = require('./bootstrap')

const indexRoute = require('./routes/index')
const accountRoute = require('./routes/account')

app.set('view engine', 'pug')
app.set('views','views')


app.use('/', indexRoute)
app.use('/account', accountRoute)

module.exports = app