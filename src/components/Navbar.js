import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

export default function Navbar() {
  return (
    <header className='bg-red-600'>
      <div className='container mx-auto flex justify-between'>
        <nav>
          <NavLink to="/" className="inflex-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-gray-700 text-2xl font-bold tracking-widest active:bg-red-700">
            Ensar
          </NavLink>
          <NavLink to="/post" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200  hover:text-gray-700 active:bg-red-700"> 
            Blog Posts
          </NavLink>
          <NavLink to="/photos" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-gray-700 active:bg-red-700 ">
            Photos
          </NavLink>
{/*           <NavLink to="/project" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-black active:bg-red-700 ">
            Projects
          </NavLink> */}
{/*           <NavLink to="/about" className="inline-flex items-center mr-4 py-3 my-6 rounded text-red-200 hover:text-black active:bg-red-700 ">
            About Me
          </NavLink> */}
        </nav>
        <div className='inline-flex py-3 px-3 my-6'>
          <SocialIcon url='https://www.instagram.com/nsrnce/' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
          <SocialIcon url='https://www.youtube.com/channel/UCQ-mC4AvDdFi8BufERuzV1g' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
          <SocialIcon url='https://ensrnce.wixsite.com/main/photography' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
        </div>
      </div>
    </header>
  )
}
