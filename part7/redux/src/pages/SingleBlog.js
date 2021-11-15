import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Topbar from '../components/Topbar'
import postbg from '../assets/img/post-bg.jpg'
import { commentBlog, fetchSingleBlog } from '../action/blogActions'

const SingleBlog = () => {
  const [comment, setComment] = useState('')

  const { id } = useParams()

  const dispatch = useDispatch()

  const blogDetail = useSelector((state) => state.blogDetail)
  const { blog } = blogDetail

  const blogComment = useSelector((state) => state.blogComment)
  const { success: successComment } = blogComment

  useEffect(() => {
    dispatch(fetchSingleBlog(id))

    if (successComment) {
      dispatch({ type: 'BLOG_COMMENT_RESET' })
    }
  }, [dispatch, id, successComment])

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, { comment }))
    setComment('')
  }

  return (
    <>
      <Topbar />
      <header
        className='relative py-52 hero mb-12 bg-blend-darken '
        style={{
          background: `url(${postbg})`,
          backgroundSize: 'cover',
          backgroundColor: '#6c757d',
        }}
      >
        <div className='flex justify-center'>
          <div className='lg:w-6/12 px-6 text-start text-white'>
            <h1 className='text-6xl font-bold'>{blog.title}</h1>
            <h2 className='text-3xl font-semibold my-3'>{blog.url}</h2>
            <span className='font-light italic text-xl'>{`Posted by ${blog.author}`}</span>
          </div>
        </div>
      </header>

      <div className='mx-auto max-w-screen-sm mb-6'>
        <h3 className='mb-4 text-xl font-semibold text-gray-900'>Comments</h3>

        <form onSubmit={handleComment} className='mb-4'>
          <textarea
            className='w-full shadow-inner p-4 border-0 mb-4 rounded-lg focus:shadow-outline text-2xl'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Leave a comment'
            id='comment_content'
            spellCheck='false'
          ></textarea>
          <button className='font-bold py-2 px-4 w-full bg-purple-400 hover:bg-purple-300 text-lg text-white shadow-md rounded-lg transition duration-300'>
            Comment
          </button>
        </form>

        <div className='space-y-4'>
          <div className='flex flex-wrap'>
            {blog.comments &&
              blog.comments.map((com) => {
                return (
                  <div
                    key={com}
                    className='
              w-full
              border
              rounded-lg
              mb-4
              px-4
              py-2
              sm:px-6 sm:py-4
              leading-relaxed
            '
                  >
                    <p>{com}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlog
