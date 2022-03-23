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
      <h1 className='text-5xl text-gray-600 flex justify-center cursive'>Photography</h1>
      <br />
       {isSlide ? (

          <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner relative w-full overflow-hidden">
        <Slide>
            {slideImages.map((slideImage, index)=> (
              
                <div className="carousel-item active relative float-left w-full">
                <img src={slideImage.url} className="block w-full" alt="..."/>
                <div className="carousel-caption hidden md:block absolute text-center">
                  <h5 className="text-xl">{slideImage.alt}</h5>
                </div>
                </div>
                
              ))} 
        </Slide>
          </div>
          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span data-bs-slide="prev" className="visually-hidden p-10  text-white text-xl">Previous</span>
          </button>
          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCaptions" 
          >
            <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span  className="visually-hidden text-white text-xl p-10">Next</span>
          </button>

          <button
            className="carousel-control-prev absolute top-5 bottom-30 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            onClick={slideHandler}
          >
            <span className="carousel-control-next-icon  inline-block bg-no-repeat" aria-hidden="true"></span>
            <span  className="visually-hidden text-white text-xl p-10">Back</span>
          </button>
        </div>

       ) : 

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {imageUrls && imageUrls.map((item, i) => (
        <article key={i} onClick={slideHandler} className="cursor-pointer">
          <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-red-400' key={i}>
            <img src={imageUrls[i].url} key={i} alt={imageUrls[i].url} className="w-full h-full rounded-r object-cover absolute" /> 
            <span className='block relative h-full flex justify-end items-end pr-3 pb-3'>
              <h3 className='text-white text-md font-blog px-3 py-4 bg-red-400 bg-opacity-40 rounded'>{imageUrls[i].alt}</h3>
            </span>
          </span>
        </article>
        ))}
      </div>
  }
    </section>
  </main>    
    )
  }
