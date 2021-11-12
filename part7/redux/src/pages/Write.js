import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from '../action/blogActions'

const Write = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogCreate = useSelector((state) => state.blogCreate)
  const { success: successCreate } = blogCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push('/')
      dispatch({ type: 'BLOG_CREATE_RESET' })
    }
  }, [history, dispatch, userInfo, successCreate])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      `Submit a blog with title: ${title} by author: ${author} and url: ${url}`
    )
    const newBlog = {
      title,
      author,
      url,
    }
    dispatch(createBlog(newBlog))
    // clear input
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-400'>
      <div className='bg-white p-16 rounded shadow-2x1 w-1/2'>
        <h2 className='text-3xl font-bold mb-10 text-gray-800'>Wirte a blog</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block mb-1 font-bold text-sm text-gray-500'
            >
              Title
            </label>
            <input
              className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-400'
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='author'
              className='block mb-1 font-bold text-sm text-gray-500'
            >
              Author
            </label>
            <input
              className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-400'
              id='author'
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='url'
              className='block mb-1 font-bold text-sm text-gray-500'
            >
              Url
            </label>
            <input
              className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-400'
              id='url'
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button className='block w-full bg-yellow-400 hover:bg-yellow-300 p-4 text-yellow-900 hover:text-yellow-800 transition duration-300'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Write
