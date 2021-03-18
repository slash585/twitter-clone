const router = require('express').Router()
const middleware = require('../middleware')


router.get('/', middleware.requireLogin, async(req,res)=>{
    const payload = {
        title: 'Homepage',
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    res.render('home',payload)
})

module.exports = router