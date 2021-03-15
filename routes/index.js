const router = require('express').Router()
const middleware = require('../middleware')


router.get('/', middleware.requireLogin, async(req,res)=>{
    const payload = {
        title: 'Homepage'
    }
    res.render('home',payload)
})

module.exports = router