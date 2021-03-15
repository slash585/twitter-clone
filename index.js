const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const { mongoose } = require('./bootstrap')

const indexRoute = require('./routes/index')
const accountRoute = require('./routes/account')

app.set('view engine', 'pug')
app.set('views','views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRoute)
app.use('/account', accountRoute)

module.exports = app