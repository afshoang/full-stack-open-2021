import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleAddBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setBlog((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleAddBlog(blog)

    setBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Create new blog</h2>
        <div>
          title
          <input
            id='title'
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
            id='author'
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
            id='url'
            type='text'
            value={blog.url}
            name='url'
            onChange={handleChange}
          />
        </div>
        <button id='addBlog'>Add new blog</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
}

export default BlogForm
