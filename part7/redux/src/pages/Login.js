import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../action/userActions'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    const credential = {
      username,
      password,
    }
    dispatch(login(credential))
    // clear input
    setUsername('')
    setPassword('')
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-400'>
      <div className='bg-white p-16 rounded shadow-2x1 w-1/2'>
        <h2 className='text-3xl font-bold mb-10 text-gray-800'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='username'
              className='block mb-1 font-bold text-sm text-gray-500'
            >
              Username
            </label>
            <input
              className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-400'
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='username'
              className='block mb-1 font-bold text-sm text-gray-500'
            >
              Password
            </label>
            <input
              className='w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-400'
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='block w-full bg-yellow-400 hover:bg-yellow-300 p-4 text-yellow-900 hover:text-yellow-800 transition duration-300'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
