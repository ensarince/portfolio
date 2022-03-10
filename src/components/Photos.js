import React from 'react'
import background from '../imgs/8.jpg';

export default function Photos() {
  return (
    <main className='container mx-auto flex justify-between'>
      <img src={background} alt="profile" className='absolute object-cover object-contain w-full h-full' />
      <section className='container relative flex justify-center min-h-screen pt-12 lg:pt-64'>
        
      </section>
    </main>
  )
}
