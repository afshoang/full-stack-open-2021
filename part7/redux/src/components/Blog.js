import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, fetchBlogs, likeBlog } from '../action/blogActions'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogDelete = useSelector((state) => state.blogDelete)
  const { success: successDelete } = blogDelete

  const handleDelete = () => {
    if (window.confirm('Are you sure want to delete this blog?')) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: 'BLOG_DELETE_RESET' })
      dispatch(fetchBlogs())
    }
  }, [dispatch, successDelete])

  return (
    <>
      <div className='p-6'>
        <Link to={`/blog/${blog.id}`} className='hover:text-blue-400'>
          <h2 className='text-4xl font-bold mt-7 mb-2.5'>{blog.title}</h2>
        </Link>
        <p>{blog.likes} likes</p>
        <p className='text-gray-500 italic mb-2.5'>
          Posted by {blog.user.name}
        </p>
        <div>
          <button
            onClick={() => handleLike()}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
          >
            Like
          </button>
          <button
            onClick={() => handleDelete()}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded '
          >
            Delete
          </button>
        </div>
      </div>
      <hr className='mx-6' />
    </>
  )
}

export default Blog
