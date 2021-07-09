const mongoose = require('mongoose')
const supertest = require('supertest')
const bcryptjs = require('bcryptjs')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcryptjs.hash('secret', 10)
    const newUser = new User({
      username: 'hoangpham',
      passwordHash,
      name: 'Hoang Pham',
    })
    await newUser.save()
  })

  test('fail when username and password is missing and have proper errror message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      passwordHash: 'secretpass',
      name: 'Hoang Pham',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password is missing')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fail when username or password have length < 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      password: '123456',
      name: 'Hoang Pham',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'username and password must be at least 3 character long'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fail when user already exist', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hoangpham',
      password: '123456',
      name: 'Hoang Pham',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'User validation failed: username: Error, expected `username` to be unique. Value: `hoangpham`'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
