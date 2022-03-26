import React, {useState, useEffect} from 'react'
import sanityClient from '../client';
import background from '../imgs/8.jpg';
import imageUrlBuilder from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react';

//using imageurlbuilder
const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
  return builder.image(source)
}

export default function About() {
  const [author, setAuthor] = useState(null)
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          name,
          bio,
          "authorImage": image.asset->url
        }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error)
  }, [])

  if(!author) return <div>Loading...</div>
  
  return (
    <main className='relative'>
      <img src={background} alt="profile" className='absolute object-cover object-contain w-full h-full' />
      <div className='p-10 lg:pt-48 container mx-auto relative'>
        <section className='bg-opacity-70 rounded-lg shadow-2xl lg:flex p-20'>
          <img src={urlFor(author.authorImage).url()} className="rounded w-32 h-32 lg:w-64 lg:h-64 object-cover mr-8" alt={author.authorImage} />
          <div className='text-lg flex flex-col justify-center'>
            <h1 className='cursive text-6xl text-zinc-50 mb-4'>{author.name}{" "}
            </h1>
            <div className='prose lg:prose-xl text-2xl text-zinc-50'>
              <SanityBlockContent blocks={author.bio} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
 