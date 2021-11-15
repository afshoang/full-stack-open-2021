import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../action/userActions'

const Topbar = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className='absolute top-0 left-0 right-0 bg-transparent z-50 text-white '>
      <div className='container mx-auto flex justify-between px-12 '>
        <ul className='flex font-bold'>
          <Link to='/' className='p-3 hover:text-gray-200 '>
            <li>BLOG</li>
          </Link>
          <Link to='/write' className='p-3 hover:text-gray-200'>
            <li>WRITE</li>
          </Link>
          <Link to='/users' className='p-3 hover:text-gray-200'>
            <li>USER</li>
          </Link>
          {userInfo && (
            <li
              onClick={() => handleLogout()}
              className='p-3 cursor-pointer hover:text-gray-200'
            >
              LOGOUT
            </li>
          )}
        </ul>

        <div>
          {userInfo ? (
            <p className='p-3'>{userInfo.name} is logged in</p>
          ) : (
            <ul className='flex ml-auto'>
              <Link to='/login' className='p-3 hover:text-gray-400'>
                <li>LOGIN</li>
              </Link>
              <Link to='register' className='p-3 hover:text-gray-400'>
                <li>REGISTER</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Topbar
