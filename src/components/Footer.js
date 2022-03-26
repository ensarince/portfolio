import React from 'react'
import { NavLink } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <header className='bg-gray-300'>
    <div className='container mx-auto flex justify-between'>
      <div className='inline-flex py-3 px-3 my-6'>
        <SocialIcon url='https://www.instagram.com/nsrnce/' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
        <SocialIcon url='https://www.youtube.com/channel/UCQ-mC4AvDdFi8BufERuzV1g' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
        <SocialIcon url='https://ensrnce.wixsite.com/main/photography' className='mr-4' target="_blank" fgColor="#fff" style={{height: 35, width: 35}}/>
      </div>
    </div>
  </header>
  )
}

export default Footer