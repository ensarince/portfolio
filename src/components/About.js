import React, {useState, useEffect} from 'react'
import sanityClient from '../client';
import background from '../DSC07790.jpg';
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
      <img  src={background} alt="backgorund" className='absolute w-full'/>
      <div className='p-10 lg:pt-48 container mx-auto relative'>
        <section className='bg-gray-400 bg-opacity-60 rounded-lg shadow-2xl lg:flex p-20'>
          <img src={urlFor(author.authorImage).url()} className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8" alt={author.authorImage} />
          <div className='text-lg flex flex-col justify-center'>
            <h1 className='cursive text-6xl text-black mb-4'>{author.name}{" "}
            </h1>
            <div className='prose lg:prose-xl text-white'>
              <SanityBlockContent blocks={author.bio} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
 