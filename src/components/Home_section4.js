import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home_section4 = () => {
  const [technologyBlogs, setTechnologyBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the API
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        // Filter blogs related to the technology subject
       
        const techBlogs = response.data.filter(blog => blog.subject === 'Fashion' || blog.subject === 'beauty' || blog.subject === 'fashion' || blog.subject === 'Beauty');
        // Assuming you want only the first 3 technology blogs
        setTechnologyBlogs(techBlogs.slice(0, 4));
      })
      .catch(error => {
        console.error('Error fetching technology blogs:', error);
      });
  }, []); 

  const extractFirstImgTag = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const firstImgTag = doc.querySelector('img');
    return firstImgTag ? [firstImgTag.outerHTML] : [];
  };
  

  const navigate = useNavigate();
const handleBtnClick = async (selectedBlog) =>{
  navigate(`/blog/${selectedBlog._id}`,{state:{selectedBlog}})
}

  return (
   <>
   
  
   
   <div className=' grid grid-cols-2 pl-10 pr-24 py-16 gap-5'>
   
      {technologyBlogs.map(blog => (
        <div className=' ' key={blog._id} >
          <div className=''>
               {extractFirstImgTag(blog.content).map((imgTag, index) => (
               <div className='rounded-xl overflow-hidden   h-60 bg-slate-500 ' key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
               ))}
          </div>
          {/* w-50 h-40 overflow-hidden mr-9 */}

          <h1 className='font-semibold mt-1 text-2xl'>{blog.title}</h1>
          <h1 className='font-semibold text-gray-700 text-sm mt-1 '>{blog.author} </h1>
          {/* <h1 className=''>{blog.summary}</h1> */}
          <button className='text-red-900 text-sm font-medium flex justify-center items-center' onClick={() => handleBtnClick(blog)}>
            <p>READ MORE</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
              <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
    

   </>
  )
}

export default Home_section4


// import React from 'react'

// const Home_section4 = () => {
//   return (
//    <>
//    <div className=''>
//             <img  className="rounded-xl" src="images/p1.png" alt="blogpic" />
//             <h1 className='font-bold'>Analyzing Spotify Music UI/UX</h1>
//              <p>In the ever-evolving landscape of digital music streaming, Spotify stands out as a titan, boasting millions of users worldwide. </p>
//              <button className='text-red-900 text-sm font-medium flex justify-center items-center '>
//                          <p>READ MORE</p>
//                          <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
//                <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z"/>
//              </svg>
             
//                      </button>   
//      </div>
    
   
   
    
//    </>
//   )
// }

// export default Home_section4
