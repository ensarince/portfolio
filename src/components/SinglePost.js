import React, {useState, useEffect} from 'react';
import sanityClient from '../client';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url'
import SanityBlockContent from '@sanity/block-content-to-react';


//using imageurlbuilder
const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
  return builder.image(source)
}

export default function SinglePost() {

  const [ singlePost, setsinglePost ] = useState(null)
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      [images]{
        _id, 
        title,
        description,
        image[]{
          asset->{
            _id,
            url,
          }
        } 
     },
      body,
      "name": author->name,
      "authorImage": author->image
    }`).then((data) => setsinglePost(data[0]))
        .catch(console.error);
  }, [slug])

  if(!singlePost) return <div>Loading...</div>
  //trying to put images in array
    const singlePostImages = [singlePost.images];
   
  return (
    <main className='bg-gray-200 min-h-screen p-12'>
      <article className='container shadow-lg mx-auto bg-gray-400 rounded-lg'>
        <header className='relative'>
          <div className='absolute h-full w-full flex items-cente justify-center p-8'>
            <div className='bg-white bg-opacity-60 rounded p-12'>
              <h1 className='cursive text-3xl lg:text-6xl text-gray-600 mb-4'>{singlePost.title}</h1>
              <div className='flex justify-center text-gray-800'>
                <img src={urlFor(singlePost.authorImage).url()} alt={singlePost.name} className="w-20 h-20 rounded-full"/>
              </div>
              <p className='cursive flex items-center pl-2 text-2xl'>{singlePost.name}</p>
            </div>
          </div>
          <img src={singlePost.mainImage.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t" style={{height: "400px"}} />
        </header>
        <div className='px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full'>
          <SanityBlockContent blocks={singlePost.body} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
          <img src={singlePost.images.image.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t" style={{height: "400px"}} />
          {/* image section */}
          {/* {singlePostImages && (
            <div>
              {singlePostImages.map((item) => (
              <img src={singlePost.images.image_[{item}].asset.url} alt={singlePost.title} key={item} className="w-full object-cover rounded-t" style={{height: "400px"}} />
          ))}
            </div>
          )} */}
        </div>
      </article>
    </main>
  )
}
