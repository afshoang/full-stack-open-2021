import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../action/blogActions'
import Blog from '../components/Blog'
import Header from '../components/Header'

const Home = () => {
  const dispatch = useDispatch()

  const blogList = useSelector((state) => state.blogList)
  const { blogs } = blogList

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  return (
    <>
      <Header />
      <div className='container mx-auto px-12'>
        <div className='grid justify-center flex-wrap'>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
