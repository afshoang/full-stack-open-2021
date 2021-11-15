import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../action/userActions'
import userbg from '../assets/img/about-bg.jpg'

const UserList = () => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { users } = userList

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <>
      <header
        className='relative py-28 hero mb-12'
        style={{
          background: `url(${userbg})`,
          backgroundSize: 'cover',
          backgroundColor: '#6c757d',
        }}
      >
        <div className='px-16 text-center text-white'>
          <h1 className='text-8xl font-bold'>USER</h1>
        </div>
      </header>
      <table className='table-auto w-full'>
        <thead>
          <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
            <th className='px-4 py-3'>Name</th>
            <th className='px-4 py-3'>Blog Created</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {users.map((user) => {
            return (
              <tr key={user.id} className='text-gray-700'>
                <td className='px-4 py-3 border'>
                  <div className='flex items-center text-sm'>
                    <div>
                      <Link to={`/?userId=${user.id}`}>
                        <p className='font-semibold text-black'>{user.name}</p>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className='px-4 py-3 text-ms font-semibold border'>
                  {user.blogs.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default UserList
