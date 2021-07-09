const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

// @desc Fetch all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc Create new user
usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  const salt = await bcryptjs.genSalt(10)
  const passwordHash = await bcryptjs.hash(password, salt)

  const newUser = new User({
    username,
    passwordHash,
    name,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

module.exports = usersRouter
