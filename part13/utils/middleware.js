const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.message === "Cannot read property 'likes' of null") {
    return response.status(404).send({ error: 'Cannot find this blog' })
  }

  if (error.message === 'notNull Violation: blog.url cannot be null') {
    return response.status(404).send({ error: 'blog url must not be empty' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      res.status(401).json({ error: 'token invalid' })
    }
  } else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = { errorHandler, tokenExtractor }
