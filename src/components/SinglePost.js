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
      "images": images[]{
        _id,
        "url" : asset-> 
        url,
        description,
      },
      "imageUrls": images[].asset->url,
      publishedAt,
      body,
      "name": author->name,
      "authorImage": author->image
    }`).then((data) => setsinglePost(data[0]))
        .catch(console.error);
  }, [slug])

  if(!singlePost) return <div>Loading...</div>

  //format date 
  const date = new Date(singlePost.publishedAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);


  return (
    <main className='bg-gray-200 min-h-screen p-3'>
      <article className='container shadow-lg bg-gray-400 rounded-lg'>
        <header className='relative'>
          <div className='absolute h-full w-full flex items-center justify-center p-3'>
            <div className='bg-white bg-opacity-60 rounded p-12'>
              <h1 className='cursive text-3xl lg:text-6xl text-gray-600 mb-4'>{singlePost.title}</h1>
              <div className='flex justify-center text-gray-800'>
                <img src={urlFor(singlePost.authorImage).url()} alt={singlePost.name} className="w-20 h-20 rounded-full"/>
             </div>
             <div className='flex justify-center'>
                <p className='cursive flex px-10 text-2xl'>{singlePost.name}</p>
             </div>
             <p className=' px-10 pl-3 cursive text'>{formattedDate}</p>    
            </div>
          </div>
          <img src={singlePost.mainImage.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t" style={{height: "400px"}} />
        </header>
        <div className='px-5 lg:px-48 content-center py-12 lg:py-20 prose lg:prose-xl max-w-full'>
          <SanityBlockContent blocks={singlePost.body} projectId={process.env.REACT_APP_PROJECT_ID} dataset="production" />
            <div>
              {singlePost.imageUrls && singlePost.imageUrls.map((item, i) => (
                <div>
                  <img src={singlePost.imageUrls[i]} alt={singlePost.title} key={item} className="object-scale-down prose object-cover rounded-t mb-2 mt-5 md: mb-0" style={{height: "400px"}} />
                   <p className='flex text-xl lg:text-2xl text-black mb-8 place-content-center ' key={item[i]}>{singlePost.images[i].description}</p>
                </div>
              ))}
            </div>       
        </div>
      </article>
    </main> 
  )
}
