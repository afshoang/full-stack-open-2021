const router = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username },
  })

  console.log('user from db', user)

  const isMatchPass = await bcrypt.compare(password, user.passwordHash)

  if (!(user && isMatchPass)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
