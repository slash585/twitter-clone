const router = require('express').Router()

router.get('/login', (req,res,next)=>{
    res.status(200).render('login')
})

module.exports = router