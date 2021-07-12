import React, { useState, useEffect } from 'react'
import './App.css'
import Alert from './components/Alert'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUserJSON')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      localStorage.setItem('loggedUserJSON', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showAlert('Wrong username or password', 'danger')
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedUserJSON')
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setBlog((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    try {
      const addedBlog = await blogService.create(blog)
      setBlogs([...blogs, addedBlog])
      showAlert(
        `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
        'success'
      )
      setBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (error) {
      console.log(error)
      showAlert(`Please fill all fields!`, 'danger')
    }
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })

    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <h2>Login to application</h2>
        <Alert alert={alert} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Alert alert={alert} />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <div>
        <h2>Create new blog</h2>

        <div>
          title
          <input
            type='text'
            value={blog.title}
            name='title'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={blog.author}
            name='author'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={blog.url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <button onClick={handleAddBlog}>Add new blog</button>
      </div>
    </>
  )
}

export default App
