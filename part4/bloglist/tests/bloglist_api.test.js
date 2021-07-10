const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// token
let token

beforeAll((done) => {
  api
    .post('/api/login')
    .send({
      username: 'hoangpham',
      password: 'secret',
    })
    .end((err, res) => {
      token = res.body.token
      done()
    })
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('bloglist are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 blog post', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const result = response.body.map((r) => r.id)

  expect(result[0]).toBeDefined()
})

test('create a new blog post', async () => {
  const newBlogPost = {
    title: 'How to carry by Kaisa',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
    likes: 999,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map((blog) => blog.title)

  expect(titles).toContain('How to carry by Kaisa')
})

test('if the like prop is missing, it will default to 0', async () => {
  const newBlogPost = {
    title: 'This blog has default like prop to 0',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd[blogAtEnd.length - 1].likes).toBe(0)
})

test('a blog post without title or author will not be added', async () => {
  const newBlogPost = {
    url: 'http://hoangpham.com',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogPost)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('add a blog without token will be fail with 401 status code', async () => {
  const newBlogPost = {
    title: 'this is test blog',
    author: 'HoangPham',
    url: 'http://hoangpham.com',
    likes: 999,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer failedtoken`)
    .send(newBlogPost)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
