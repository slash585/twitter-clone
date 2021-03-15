const router = require('express').Router()

router.get('/', async(req,res)=>{
    const payload = {
        title: 'Homepage'
    }
    res.render('home',payload)
})

module.exports = router