import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Alert from './components/Alert'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleAddBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(blogObj)
      setBlogs([...blogs, addedBlog])
      showAlert(
        `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
        'success'
      )
    } catch (error) {
      console.log(error)
      showAlert(`Please fill all fields!`, 'danger')
    }
  }

  const updateBlog = async (id) => {
    try {
      const updatedBlog = await blogService.update(id)
      setBlogs((prevState) => {
        const stateCopy = [...prevState]
        stateCopy.map((el) =>
          el.id === updatedBlog.id ? { ...el, likes: el.likes++ } : el
        )
        return [...stateCopy]
      })
      showAlert(
        `blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
        'success'
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      )

      if (!confirm) {
        return
      }

      await blogService.deleteBlog(blog.id)
      setBlogs((prevState) => {
        const stateCopy = [...prevState]
        const filteredState = stateCopy.filter((el) => el.id !== blog.id)
        return [...filteredState]
      })
      showAlert(`Deleted blog ${blog.title}`, 'success')
    } catch (error) {
      console.log(error)
      showAlert('You dont have permission to delete this blog', 'danger')
    }
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })

    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  // ref for blogFrom
  const blogFormRef = useRef()

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
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
      </div>
      <Togglable labelButton='Create a new blog' ref={blogFormRef}>
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
    </>
  )
}

export default App
