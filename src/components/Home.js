import React from 'react'
import background from '../imgs/8.jpg';
import { NavLink } from 'react-router-dom'


export default function Home() {
  return (
    <main className='container mx-auto flex justify-between'>
      <img src={background} alt="profile" className='absolute object-cover object-contain w-full h-full' />
      <section className='container relative flex justify-center min-h-screen pt-12 lg:pt-64'>
        <h2 className='text-white text-8xl cursive inline-flex leading-none '>
        <NavLink to="/post" className="flex rounded text-white hover:text-red-600">
          blog
        </NavLink>
        .
        <NavLink to="/photos" className="flex rounded text-white hover:text-red-600">
          photos
        </NavLink>
          </h2>
      </section>
    </main>
  )
}
