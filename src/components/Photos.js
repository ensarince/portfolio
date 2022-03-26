import React, {useState, useEffect} from 'react';
import sanityClient from '../client';
import { useParams } from 'react-router-dom';
import background from '../imgs/8.jpg';
import imageUrlBuilder from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
  return builder.image(source)
}

export default function Photos() {

  const [postData, setPostData] = useState(null);
  const [isSlide, setisSlide] = useState(false)
  //const { slug } = useParams();

  function slideHandler(){
    setisSlide(!isSlide);
  }

  const postItems = (`
*[_type == "gallery"] {  
  title,
  images[]{
    "url" : asset->
     url,
     alt
  },  
}`);
  useEffect(() => {
    sanityClient
      .fetch(postItems)
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  //cant reach the data, so first loading shows, functioning like await
  if(!postData) return <div>Loading...</div>
  
  const imageUrls = postData[0].images;

//SLIDER IMAGES
  const slideImages = postData[0].images;

  return (
    <main className="bg-cover  min-h-screen p-12"> 
    <section className='container mx-auto'>
      <h1 className='text-5xl text-gray-600 flex justify-center'>Photography</h1>
      <br />
      <br />


      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {imageUrls && imageUrls.map((item, i) => (
        <article key={i} /* onClick={slideHandler} className="cursor-pointer" */>
          <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-red-400' key={i}>
            <img src={imageUrls[i].url} key={i} alt={imageUrls[i].url} className="w-full h-full rounded-r object-cover absolute" /> 
            <span className='block relative h-full flex justify-end items-end pr-3 pb-3'>
              <h3 className='text-white text-md font-blog px-3 py-4 bg-red-400 bg-opacity-40 rounded'>{imageUrls[i].alt}</h3>
            </span>
          </span>
        </article>
        ))}
      </div>
    </section>
  </main>    
    )
  }
