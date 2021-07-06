const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  if (req.body.title === undefined || req.body.author === undefined) {
    return res.status(400).end()
  }

  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
  }

  const blog = new Blog(newBlog)

  const result = await blog.save()

  res.status(201).json(result)
})

module.exports = blogsRouter
