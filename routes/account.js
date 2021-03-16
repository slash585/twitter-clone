const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.get("/login", (req, res, next) => {
  res.status(200).render("login")
})

router.post("/login", async (req, res, next) => {
  const payload = req.body

  if (req.body.loginUsername && req.body.loginPassword) {
    var user = await User.findOne({
      $or: [
        { username: req.body.loginUsername },
        { email: req.body.loginUsername },
      ],
    }).catch((error) => {
      console.log(error)
      payload.errorMessage = "Something went wrong."
      res.status(200).render("login", payload)
    })

    if (user != null) {
      var result = await bcrypt.compare(req.body.loginPassword, user.password)

      if (result === true) {
        req.session.user = user
        return res.redirect("/")
      }
    }

    payload.errorMessage = "Login credentials incorrect."
    return res.status(200).render("login", payload)
  }

  payload.errorMessage = "Make sure each field has a valid value."
  res.status(200).render("login")
})

router.get("/register", (req, res, next) => {
  res.status(200).render("register")
})

router.post("/register", async (req, res, next) => {
  const firstName = req.body.firstName.trim()
  const lastName = req.body.lastName.trim()
  const username = req.body.username.trim()
  const email = req.body.email.trim()
  const password = req.body.password.trim()

  const payload = req.body

  if (firstName && lastName && username && email && password) {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error) => {
      console.log(error)
      payload.errorMessage = "Something went wrong.."
      res.status(200).render("register", payload)
    })

    if (user == null) {
      // user not found
      const data = req.body
      data.password = await bcrypt.hash(password, 10)
      User.create(data).then((user) => {
        req.session.user = user
        return res.redirect("/")
      })
    } else {
      // user found
      if (email == user.email) {
        payload.errorMessage = "Email already in use"
      } else {
        payload.errorMessage = "Username already in use"
      }
      res.status(200).render("register", payload)
    }
  } else {
    payload.errorMessage = "Make sure each has a valid value."
    res.status(200).render("register", payload)
  }
})

router.get('/logout', async(req,res,next)=>{
  if(req.session) {
    req.session.destroy(()=>{
      res.redirect('/account/login')
    })
  }
})

module.exports = router
