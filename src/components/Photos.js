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

  const [postData, setPost] = useState(null);
  const { slug } = useParams();


  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      slug,
      _id,
      images,
      "images": images[]{
        ,
        "url" : asset-> url,
        alt, 
      },
      "imageUrls": images[].asset->url 
    }`
          
  ).then((data) => setPost(data[0]))
        .catch(console.error);
  }, [slug])

  //if(!postData) return <div>Loading...</div>

  return (
    <main className='container mx-auto flex justify-between'>
      <img src={background} alt="profile" className='absolute object-cover object-contain w-full h-full' />
      <section className='container relative flex justify-center min-h-screen pt-12 lg:pt-64'>
        <div>
          <img src={urlFor(postData.imageUrls).url()} width={400} />
          <p>{postData?.caption}</p>
        </div>

        <div>
          {postData.imageUrls && postData.imageUrls.map(
              ({ images }) =>
                images && (
                  <div>
                    <img src={postData.images.asset.url} width={400} />
                  </div>
                )
            )}
          ;
          <img src={postData.images?.asset?.url} width={400} />
        </div>
      </section>
    </main>
  )
}
