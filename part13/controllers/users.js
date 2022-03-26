const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      },
    },
    attributes: { exclude: ['passwordHash'] },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    username,
    name,
    passwordHash,
  })

  res.status(201).json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
    attributes: { exclude: ['passwordHash'] },
  })

  if (user) {
    user.username = req.body.username
    await user.save()
  }

  res.json(user)
})

module.exports = router
