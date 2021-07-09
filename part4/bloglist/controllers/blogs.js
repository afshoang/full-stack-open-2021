const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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

  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: req.body.userId,
  }

  const blog = new Blog(newBlog)

  const result = await blog.save()

  res.status(201).json(result)
})

// Delete a single note
blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndRemove(id)

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
