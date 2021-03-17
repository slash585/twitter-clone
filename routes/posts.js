const router = require("express").Router()
const Post = require("../models/post")
const User = require('../models/user')

router.get("/", async (req, res, next) => {
  try{
    const posts = await Post.find().populate('postedBy').sort({'createdAt': -1})
    res.status(200).send(posts)
  }catch(e){
    console.log(e)
    res.sendStatus(400)
  }
})

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request")
    return res.sendStatus(400)
  }

  var postData = {
    content: req.body.content,
    postedBy: req.session.user,
  }

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" })

      res.status(201).send(newPost)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(400)
    })
})

module.exports = router
