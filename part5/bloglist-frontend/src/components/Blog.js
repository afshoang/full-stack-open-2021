import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={viewHiddenContent}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{' '}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </p>
          <button onClick={() => deleteBlog(blog)}>remove</button>
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
