const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['id', 'passwordHash'],
      },
    },
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  const blog = await Blog.build(req.body)

  blog.userId = user.id

  await blog.save()

  res.json(blog)
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes += 1

  await blog.save()
  res.status(200).json({ message: 'Updated blog', likes: blog.likes })
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (blog.userId == req.decodedToken.id) {
      await Blog.destroy({
        where: {
          id: req.params.id,
        },
      })

      res.status(200).json({ message: 'Deleted blog' })
    } else {
      res
        .status(400)
        .json({ message: 'You dont have permission to delete this blog' })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
