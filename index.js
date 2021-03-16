const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const { mongoose } = require('./bootstrap')

const indexRoute = require('./routes/index')
const accountRoute = require('./routes/account')
const postRoute = require('./routes/posts')

app.set('view engine', 'pug')
app.set('views','views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'erkinkorayçöpçüler',
    resave: true,
    saveUninitialized: false
}))

app.use('/', indexRoute)
app.use('/account', accountRoute)
app.use('/api/posts', postRoute)

module.exports = app