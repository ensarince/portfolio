import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

export default function Navbar() {
  return (
    <header className='bg-red-600'>
      <div className='container mx-auto flex justify-between'>
        <nav>
          <NavLink to="/" className="inflex-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-gray-700 text-2xl cursive font-bold tracking-widest active:bg-red-700">
            Ensar
          </NavLink>
          <NavLink to="/post" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200  hover:text-gray-700 cursive active:bg-red-700"> 
            Blog Posts
          </NavLink>
          <NavLink to="/photos" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-gray-700 cursive active:bg-red-700 ">
            Photos
          </NavLink>
          <NavLink to="/project" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-black cursive active:bg-red-700 ">
            Projects
          </NavLink>
          <NavLink to="/about" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-black cursive active:bg-red-700 ">
            About Me
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
