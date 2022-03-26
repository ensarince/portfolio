import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <header className='bg-gray-400 '>
      <div className='flex justify-center mx-auto py-6 '>
        <SocialIcon url='https://www.instagram.com/nsrnce/' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
        <SocialIcon url='https://www.youtube.com/channel/UCQ-mC4AvDdFi8BufERuzV1g' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
        <SocialIcon url='https://ensrnce.wixsite.com/main/photography' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
      </div>
  </header>
  )
}

export default Footer