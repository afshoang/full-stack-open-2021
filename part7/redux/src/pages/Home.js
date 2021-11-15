import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../action/blogActions'
import Blog from '../components/Blog'
import Header from '../components/Header'

const Home = () => {
  const dispatch = useDispatch()

  const { search } = useLocation()

  // get userId from ?userId=
  const userId = search.split('=')[1]

  const blogList = useSelector((state) => state.blogList)
  const { blogs } = blogList

  useEffect(() => {
    if (userId) {
      dispatch(fetchBlogs(userId))
    } else {
      dispatch(fetchBlogs())
    }
  }, [dispatch, userId])

  return (
    <>
      <Header />
      <div className='container mx-auto px-12 ld:gap-x-32'>
        <div className='grid justify-center flex-wrap lg:px-32'>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
