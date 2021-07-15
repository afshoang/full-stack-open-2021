import React, { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setBlog((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit form add blog')
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
        <button>Add new blog</button>
      </form>
    </>
  )
}

export default BlogForm