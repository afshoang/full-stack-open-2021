const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

// Create a new blog
blogsRouter.post('/', async (req, res) => {
  if (req.body.title === undefined || req.body.author === undefined) {
    return res.status(400).end()
  }
  const userId = req.user.id
  if (!req.token || !userId) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(userId)

  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user.id,
  }

  const blog = new Blog(newBlog)

  const result = await blog.save()

  res.status(201).json(result)
})

// Delete a single note
blogsRouter.delete('/:id', async (req, res) => {
  // get creator of this blog
  const blog = await Blog.findById(req.params.id)

  // get user is logged
  const user = req.user

  // without token or userId !== blog.user.id
  if (!user || blog.user.toString() !== user.id.toString()) {
    return res
      .status(401)
      .json({ error: 'you dont have permission to delete this blog' })
  }

  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

// Update a blog
blogsRouter.put('/:id', async (req, res) => {
  const blogToUpdate = await Blog.findById(req.params.id)

  blogToUpdate.likes += 1

  const updatedBlog = await blogToUpdate.save()

  res.json(updatedBlog)
})

module.exports = blogsRouter
