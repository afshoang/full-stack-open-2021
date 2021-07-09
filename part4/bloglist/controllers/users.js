const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

// @desc Fetch all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

// @desc Create new user
usersRouter.post('/', async (req, res, next) => {
  const { username, password, name, blogs } = req.body

  // user or pass is missing
  if (!username || !password) {
    return res.status(400).json({
      error: 'username or password is missing',
    })
  } else if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'username and password must be at least 3 character long',
    })
  }

  const salt = await bcryptjs.genSalt(10)
  const passwordHash = await bcryptjs.hash(password, salt)

  const newUser = new User({
    username,
    passwordHash,
    name,
    blogs,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

module.exports = usersRouter
