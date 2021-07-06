const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to carry by Aphelios',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
    likes: 99,
  },
  {
    title: 'How to carry by Tristana',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
    likes: 999,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will be removed immediately',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
    likes: 999,
  })

  await blog.save()
  await blog.remove()

  return note._id.toString()
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
