import React from 'react'
import image from '../DSC_0395.jpg';

export default function Home() {
  return (
    <main>
      <img src={image} alt="profile" className='absolute object-cover w-full h-full' />
      <section className='relative flex justify-center min-h-screen pt-12 lg:pt-64'>
        <h3 className='text-green-100  cursive leading-none home-name'>rahatsız.</h3>
      </section>
    </main>
  )
}
