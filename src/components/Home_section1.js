import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home_section1 = () => {
  const [technologyBlogs, setTechnologyBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the API
    axios.get('https://quick-1k8t.onrender.com/api/blogs')
      .then(response => {
        // Filter blogs related to the technology subject
        const techBlogs = response.data.filter(blog => blog.subject === 'technology' ||  blog.subject === 'technology');
        // Assuming you want only the first 3 technology blogs
        setTechnologyBlogs(techBlogs.slice(0, 3));
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
  const url = `https://quick-1k8t.onrender.com/api/editblog/${selectedBlog._id}/views`;

  try {
      const response = await fetch(url, {
          method: 'PUT', // Using PUT method
          // You can include headers, body, etc. depending on your server requirements
      });
      
      // Handle response, if needed
      // For example, you might want to check response.ok or response.status to verify if the request was successful
  } catch (error) {
      // Handle errors, if any
      console.error('Error:', error);
  }
}

  return (
    <>
   
  
   <div className=' m-10  flex'>
   
      {technologyBlogs.map(blog => (
        
        <div className='mb-10  w-1/2 space-x-4  mr-3 ' key={blog._id} >
          <div className='m-1  p-0 rounded-xl' load>
          <div>
               {extractFirstImgTag(blog.content).map((imgTag, index) => (
               <div className=' rounded-xl w-52 h-28 overflow-hidden ' key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
               ))}
          </div>


          <h1 className='font-semibold text-xl mt-1'>{blog.title.slice(0,25)} ...</h1>
        
        
          {/* <h1 className=''>{blog.summary}</h1> */}
          <button className='text-red-900 text-sm  font-medium flex justify-center items-center' onClick={() => handleBtnClick(blog)}>
           READ MORE
            <svg className='' xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
              <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z"/>
            </svg>
          </button>
          </div>
        </div>
      ))}
    </div>


     

     {/* <div className='w-1/2'>
<img  className="rounded-xl" src="images/p1.png" alt="blogpic" />
<h1 className='font-bold'>Analyzing Spotify Music UI/UX</h1>
 <p>In the ever-evolving landscape of digital music streaming, Spotify stands out as a titan, boasting millions of users worldwide. </p>
 <button className='bg-gradient-to-r from-rose-500 to-fuchsia-800 bg-clip-text text-transparent border-2 border-red-600 rounded-xl text-sm  p-1 mt-4'>READ ARTICLE</button>
</div>
export default Home_section1 */}
    

   </>
  )
}

export default Home_section1



