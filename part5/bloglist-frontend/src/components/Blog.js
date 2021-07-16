import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const viewHiddenContent = () => {
    setVisible(!visible)
  }

  const handleLike = (id) => {
    updateBlog(id)
  }

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={viewHiddenContent}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{' '}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog
