import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home_section2 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the API
    axios.get('http://localhost:5000/api/blogs')
      .then(response => {
        const Lifestyle = response.data.filter(blog => blog.subject === 'lifestyle' || blog.subject === 'Lifestyle'  || blog.subject === 'fitness' || blog.subject === 'Health' || blog.subject === 'Fitness' || blog.subject === 'health');
        setBlogs(Lifestyle.slice(0, 2)); // Assuming the response is an array of blog objects  .slice(0, 3)
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []); 
  
  // Empty dependency array to run the effect only once after the initial render

//   const extractImgTags = (htmlContent) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, 'text/html');
//   const imgTags = doc.querySelectorAll('img');
//   return Array.from(imgTags).map(imgTag => imgTag.outerHTML);
// };

// Function to extract the first img tag from HTML content
const extractFirstImgTag = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const firstImgTag = doc.querySelector('img');
  return firstImgTag ? [firstImgTag.outerHTML] : [];
};

const navigate = useNavigate();
const handleBtnClick = async (selectedBlog) =>{
  navigate(`/blog/${selectedBlog._id}`,{state:{selectedBlog}})
  const url = `http://localhost:5000/api/editblog/${selectedBlog._id}/views`;

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
      <div >
        {blogs.map(blog => (
          <div className=' mb-10' key={blog._id} onClick={()=>handleBtnClick(blog)}>
                

{/* <div>
  {extractFirstImgTag(blog.content).map((imgTag, index) => (
    <div key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
  ))}
</div> */}

            <h1 className='font-medium text-2xl'>{blog.title}</h1>
            <h1 className=''>{blog.summary.slice(0,130)}...</h1>
            <h1 className='font-semibold text-gray-700 text-sm mt-1 '>{blog.author} </h1>
            {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
            <button className='text-red-900 text-sm font-medium flex justify-center items-center ' >
              <p>READ MORE</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
                <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home_section2;
