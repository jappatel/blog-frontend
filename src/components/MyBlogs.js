import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import Cookies from 'js-cookie';
const MyBlogs = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const authorName = Cookies.get('user_name');

  
    // Fetch blogs from the API
    useEffect(() => {
    axios.get('https://quick-1k8t.onrender.com/api/blogs')
      .then(response => {
        // Filter blogs related to the technology subject
        const techBlogs = response.data.filter(blog => blog.author === authorName);
        // Assuming you want only the first 3 technology blogs
        setBlogs(techBlogs);
      })
      .catch(error => {
        console.error('Error fetching technology blogs:', error);
      });
  }, []); 

   
   
    
    
     // Handler function for li click
  const handleLiClick = (subject) => {
    setSelectedSubject(subject);
  };
   // Handler function for clearing all filters
   const handleClearAll = () => {
    setSelectedSubject(null);
    setSearchTerm('');
  };


   // Handler function for search input change
   const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



   // Handler function for pressing Enter key in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Prevent the default behavior of form submission
      e.preventDefault();
      // Trigger search when Enter is pressed
      // You can perform additional actions here if needed
      // In this case, we are letting the useEffect handle the search
    }
  };
  
  
  
    function toggleCategoryVisibility(categoryId) {
      setCategories(prevCategories => {
        return prevCategories.map(category => {
          if (category._id === categoryId) {
            return { ...category, isExpanded: !category.isExpanded };
          } else {
            return { ...category, children: toggleChildrenVisibility(category.children, categoryId) };
          }
        });
      });
    }
  
    function toggleChildrenVisibility(children, categoryId) {
      return children.map(child => {
        if (child._id === categoryId) {
          return { ...child, isExpanded: !child.isExpanded };
        } else if (child.children.length > 0) {
          return { ...child, children: toggleChildrenVisibility(child.children, categoryId) };
        } else {
          return child;
        }
      });
    }
  
    function renderCategory(category) {
      return (
        <li key={category._id} className="border-b border-gray-200 py-2">
          <div className="flex items-center">
            {category.children.length > 0 && (
              <button className="mr-2" onClick={() => toggleCategoryVisibility(category._id)}>
                {category.isExpanded ? '-' : '+'}
              </button>
            )}
            <span>{category.name}</span>
          </div>
          {category.isExpanded && category.children.length > 0 && (
            <ul className="pl-4">
              {category.children.map(child => renderCategory(child))}
            </ul>
          )}
        </li>
      );
    }

    
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
const handleDelete = async (blogId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
  if (confirmDelete) {
    try {
      await axios.delete(`https://quick-1k8t.onrender.com/api/blogs/${blogId}`);
      // Remove the deleted blog from the state
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }
};


  return (
    <>
    

    <div className='flex flex-col justify-start mt-20'>
        <div className="border-b-2 border-black border-opacity-20 pl-10 pt-8">
            <h1 className='font-semibold mb-5 cursor-pointer text-2xl'>{authorName}</h1>
            <h1 className='font-semibold mb-5 cursor-pointer ml-3'>My account</h1>
        </div>
        <div className="grid gap-6 pt-10 mx-10 mb-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.length === 0 ? (
                <div className="text-center">
                    <p>No blogs found. Please write a blog.</p>
                    <button onClick={() => navigate('/')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
                        Write Blog
                    </button>
                </div>
            ) : (
                blogs.map(blog => (
                    <div className='bg-gray-100 hover:bg-rose-50 p-4 rounded-xl' key={blog._id}>
                        {extractFirstImgTag(blog.content).map((imgTag, index) => (
                            <div className='rounded-xl w-auto h-40 overflow-hidden' key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
                        ))}
                        <h1 className='font-bold text-lg mt-2'>{blog.title}</h1>
                        <h2 className='mt-1'>
                            {`${blog.createdAt.slice(5, 7)}-${blog.createdAt.slice(8, 10)}-${blog.createdAt.slice(0, 4)}`}
                        </h2>
                        <div className='flex'>
                            <button className='text-red-900 mr-3 text-sm font-medium flex justify-center items-center' onClick={() => handleBtnClick(blog)}>
                                READ
                            </button>
                            <button className='text-red-900 text-sm font-medium flex justify-center items-center' onClick={() => handleDelete(blog._id)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>


    </>
  )
}

export default MyBlogs
