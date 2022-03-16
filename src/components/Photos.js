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
    <main className='container mx-auto flex justify-between'>
      <img src={background} alt="profile" className='absolute object-cover object-contain w-full h-full' />
      <section className='container relative flex justify-center min-h-screen pt-12 lg:pt-64'>
{/*         <div>
          <img src={urlFor(postData.imageUrls).url()} width={400} />
          <p>{postData?.caption}</p>
        </div>
 */}
        <div>
           {imageUrls && imageUrls.map((item, i) => (
                  <div>
                    <img src={imageUrls[i].asset.url} key={item} width={400} />
                  </div>             
            ))} 
          
{/*           <img src={postData.images[1].asset.url} width={400} /> */}
        </div>
      </section>
    </main>
  )
}
