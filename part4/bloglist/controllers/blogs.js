const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

// Get single blog
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404).json({ message: 'Not found this blog' })
  }

  res.json(blog)
})

// Create a new blog
blogsRouter.post('/', async (req, res) => {
  if (req.body.title === '' || req.body.author === '') {
    return res.status(400).end()
  }
  // extract from token req.user
  const userId = req.user.id
  if (!req.token || !userId) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  // Get user by id extract from token
  const user = await User.findById(userId)

  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: 0,
    user: user.id,
  }

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()

  // add this blog id to blogs field of User table
  user.blogs = [...user.blogs, savedBlog.id]
  await user.save()

  res.status(201).json(savedBlog)
})

// Delete a single blog
blogsRouter.delete('/:id', async (req, res) => {
  // get creator of this blog
  const blog = await Blog.findById(req.params.id)

  // get user is logged from middleware
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
  // get user is logged from middleware
  const user = req.user

  console.log(user)

  // without token
  if (!user) {
    return res.status(401).json({ error: 'you have to login first' })
  }

  const blogToUpdate = await Blog.findById(req.params.id)

  blogToUpdate.likes += 1

  await blogToUpdate.save()

  res.status(204).end()
})

module.exports = blogsRouter
