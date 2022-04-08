import React ,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import  sanityClient from '../client';

export default function Post() {

  const [postData, setPost] = useState(null)
  //const [filtered, setFiltered] = useState([])

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{
        title,
        slug,
        publishedAt,
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        }
      }`)
      .then((data) => setPost(data))
      .catch(console.error);
  }, [])
  
    if(!postData) return <div>Loading...</div>

    //sort posts by date
  const sortedPosts = postData.sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });


  return (
    <main className='bg-gray-300 min-h-screen p-12'>
{/*       <button className='bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Hepsi</button>
      <button className='bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Tırmanış</button>
      <button className='bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Siyasi</button>
      <button className='bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Diğer</button> */}

      <section className='container mx-auto'>
        <h1 className='text-5xl text-gray-600 flex justify-center cursive'>Blog</h1>
        <br />
        <div layout className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {sortedPosts && sortedPosts.map((post, index) => (
          <article key={index}>
            <Link to={"/post/" +post.slug.current} key={post.slug.current}>
            <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-red-400' key={index}>
              <img src={post.mainImage.asset.url} alt={post.mainImage.alt} className="w-full h-full rounded-r object-cover absolute" /> 
              <span className='block relative h-full flex justify-end items-end pr-4 pb-4'>
                <h3 className='text-white text-lg font-blog px-3 py-4 bg-red-700 text-red-100 bg-opacity-75 rounded'>{post.title}</h3>
              </span>
            </span>
            </Link>
          </article>
          ))}
        </div>
      </section>
    </main>
  )
    
}
