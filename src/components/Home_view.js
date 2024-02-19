import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MostViewedBlogs = () => {
  const [Blogs, setBlogs] = useState([]);

  useEffect(() => {
  axios.get('https://quick-1k8t.onrender.com/api/blogs')
    .then(response => {

        // Get the top 5 most viewed blogs
const top5MostViewed = response.data
.map(blog => {
  const view = Number.parseInt(blog.views);
  return !isNaN(view) ? { ...blog, views: view } : { ...blog, views: 0 }; // Convert undefined to 0
})
.sort((a, b) => b.views - a.views) // Sort in descending order of views
.slice(0, 5); // Take the top 5 entries

console.log(top5MostViewed);

     

      // Do something with maxViewBlogs if needed, e.g., set it as state
      setBlogs(top5MostViewed);
    })
    .catch(error => {
      console.error('Error fetching most viewed blogs:', error);
    });
}, []);

  
  
  


  
  const extractFirstImgTag = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const firstImgTag = doc.querySelector('img');
    return firstImgTag ? [firstImgTag.outerHTML] : [];
  };

  const navigate = useNavigate();
  const handleBtnClick = async (selectedBlog) => {
    navigate(`/blog/${selectedBlog._id}`, { state: { selectedBlog } });
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
  };

  return (
    <>
    <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:flex'>
    {Blogs.map(blog => (
      <div className='blog-item mb-10 w-full sm:w-1/2  md:w-1/4' key={blog._id}>
        {extractFirstImgTag(blog.content).map((imgTag, index) => (
          <div className='rounded-xl overflow-hidden h-36' key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
        ))}
        <h1 className='font-semibold text-xl'>{blog.title}</h1>
        <h1 className='font-semibold text-gray-700 text-sm mt-1'>{blog.author}</h1>
        <button className='text-red-900 text-sm font-medium flex justify-center items-center' onClick={() => handleBtnClick(blog)}>
          <p>READ MORE</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
            <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z" />
          </svg>
        </button>
      </div>
    ))}
  </div>
  </>
  );
};

export default MostViewedBlogs;
