const router = require('express').Router()

router.get('/login', (req,res,next)=>{
    res.status(200).render('login')
})

router.get('/register', (req,res,next)=>{
    res.status(200).render('register')
})

module.exports = router