const router = require('express').Router()

router.get('/login', (req,res,next)=>{
    res.status(200).render('login')
})

router.get('/register', (req,res,next)=>{
    res.status(200).render('register')
})

router.post('/register', async(req,res,next)=>{
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const username = req.body.username.trim()
    const email = req.body.email.trim()
    const password = req.body.password.trim()

    const payload = req.body

    if(firstName && lastName && username && email && password){

    }else{
        payload.errorMessage = 'Make sure each has a valid value.'
        res.status(200).render('register', payload)
    }
})

module.exports = router