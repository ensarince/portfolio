import React, {useState, useEffect} from 'react';
import sanityClient from '../client';
import { useParams } from 'react-router-dom';
import background from '../imgs/8.jpg';
import imageUrlBuilder from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
  return builder.image(source)
}

export default function Photos() {

  const [postData, setPostData] = useState(null);
  //const { slug } = useParams();

  const postItems = (`
*[_type == "gallery"] {  
  title,
  images[]{
    asset->{
     url
    },
  },  
}`);
  useEffect(() => {
    sanityClient
      .fetch(postItems)
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  //if(!postData) return <div>Loading...</div>
  console.log(postData,"photos")

  const imageUrls = postData[0].images;

  console.log(imageUrls);


  return (
    <main className='bg-[(background)] min-h-screen p-12' > 
    <section className='container mx-auto'>
      <h1 className='text-5xl text-gray-600 flex justify-center cursive'>Photography</h1>
      <br />
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {imageUrls && imageUrls.map((item, i) => (
        <article key={item}>

          <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-red-400' key={item}>
            <img src={imageUrls[i].asset.url} alt={imageUrls[i].asset.url} className="w-full h-full rounded-r object-cover absolute" /> 
            <span className='block relative h-full flex justify-end items-end pr-4 pb-4'>
              <h3 className='text-white text-lg font-blog px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded'>tanım</h3>
            </span>
          </span>
          
        </article>
        ))}
      </div>
    </section>
  </main>    
  /*       {imageUrls && imageUrls.map((item, i) => (
                  <div>
                    <img src={imageUrls[i].asset.url} key={item} width={400} />
                  </div>             
            ))} */  
    )
  }
