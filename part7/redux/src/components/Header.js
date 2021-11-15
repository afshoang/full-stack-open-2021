import React from 'react'
import homebg from '../assets/img/home-bg.jpg'
import Topbar from './Topbar'

const Header = () => {
  return (
    <>
      <Topbar />
      <header
        className='relative py-52 hero mb-12 '
        style={{
          background: `url(${homebg})`,
          backgroundSize: 'cover',
          backgroundColor: '#6c757d',
        }}
      >
        <div className='px-16 text-center text-white'>
          <h1 className='text-8xl font-bold'>Full Stack Open</h1>
          <span className='text-xl'>2021</span>
        </div>
      </header>
    </>
  )
}

export default Header
