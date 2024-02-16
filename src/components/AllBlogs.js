import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const AllBlogs = () => {
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      async function fetchCategories() {
        try {
          const response = await fetch('https://quick-1k8t.onrender.com/api/allblogs');
          const data = await response.json();
          setCategories(data.data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
      fetchCategories();
    }, []);


    // useEffect(() => {
    //   // Fetch blogs from the API
    //   axios.get('http://localhost:5000/api/blogs')
    //     .then(response => {
    //       let filteredBlogs = response.data;
    //       if (selectedSubject) {
    //         // Filter blogs related to the selected subject
    //         filteredBlogs = filteredBlogs.filter(blog => blog.subject === selectedSubject);
    //       }
    //       if (selectedSubject) {
    //         // Filter blogs related to the selected subject
    //         filteredBlogs = filteredBlogs.filter(blog => blog.subject === selectedSubject);
    //       }

    //       if (searchTerm) {
    //         // Filter blogs based on search term
    //         filteredBlogs = filteredBlogs.filter(blog => 
    //           blog.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    //         );
    //       }
    //       // Assuming you want only the first 3 blogs
    //       setBlogs(filteredBlogs);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching blogs:', error);
    //     });
    // }, [selectedSubject]);
    useEffect(() => {
      window.scrollTo(0, 0);
      // Fetch blogs from the API with optional search term
      axios.get(`https://quick-1k8t.onrender.com/api/blogs?q=${searchTerm}`)
        .then(response => {
          let filteredBlogs = response.data;
          if (selectedSubject) {
            // Filter blogs related to the selected subject
            filteredBlogs = filteredBlogs.filter(blog => blog.subject === selectedSubject);
          }
    
          // Assuming you want only the first 3 blogs
          setBlogs(filteredBlogs); // Limit to first 3 blogs
        })
        .catch(error => {
          console.error('Error fetching blogs:', error);
        });
    }, [selectedSubject, searchTerm]);
    
    
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
    <div className=' flex flex-col justify-center items-center mt-16 '>

        <div className='divBlog w-screen  h-56 text-center border-b-2 border-black border-opacity-30 '>
            <h1 className='text-5xl font-semibold my-16 '>Blogs</h1>
           
        </div>
       
    </div>

    <div className='  justify-start   flex flex-row '>
            

            <div className="w-1/4 border-r-2 border-black border-opacity-20 pl-10    pt-8">

                   <h1 className='font-semibold mb-5 cursor-pointer'  onClick={handleClearAll} >Clear all</h1>
                   <h1 className='font-semibold text-lg mb-1'>Search</h1>
                  
            <input 
              type="text" 
              placeholder="Search Topic" 
              className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)} 
              
            />
       

                   <div className='mt-10 text-lg cursor-pointer'>
                        <h1 className='font-semibold'>Filter</h1>
                        {/* <ul  >
                           {categories.map(category => renderCategory(category))}
                        </ul> */}

                        <ul className='pt-5 ml-5'>
                          
                        <li className='hover:text-red-600 hover:text-xl' onClick={() => handleLiClick('technology')}>Technology</li>
                    
                        <li className='hover:text-red-600 hover:text-xl' onClick={() => handleLiClick('Lifestyle')}>Lifestyle</li>
                         <li className='hover:text-red-600 hover:text-xl'  onClick={() => handleLiClick('health')}>Health and fitness</li>
                         <li className='hover:text-red-600 hover:text-xl'  onClick={() => handleLiClick('Food')}>Food</li>
                         <li className='hover:text-red-600 hover:text-xl' onClick={() => handleLiClick('Travel')}>Travel</li>
                         <li className='hover:text-red-600 hover:text-xl' onClick={() => handleLiClick('Fashion')}>Fashion and Beauty</li>
                         <li className='hover:text-red-600 hover:text-xl' onClick={() => handleLiClick('Education')}>Education</li>


                         
                        </ul>
                   </div>

                   

            </div>
          
            <div className="w-3/4 pl-10 grid grid-cols-3 gap-6 pt-10 mr-20 ml-10 mb-5">
           
            {blogs.map(blog => (

              <div className='bg-gray-50 hover:bg-gray-100 p-2  rounded-xl'>

               {extractFirstImgTag(blog.content).map((imgTag, index) => (
               <div className=' rounded-xl w-50 h-40 overflow-hidden  border-2 border-black' key={index} dangerouslySetInnerHTML={{ __html: imgTag }} />
               ))}
                <h1 className='font-bold text-lg mt-2'>{blog.title}</h1>
                {/* <h1 className='font-bold text-lg mt-2'>{blog.subject}</h1> */}
                <h1 className='font-medium mt-1'>{blog.author}</h1>
                <h2 className='mt-1'>{`${blog.createdAt.slice(5, 7)}-${blog.createdAt.slice(8, 10)}-${blog.createdAt.slice(0, 4)}`}</h2>
                <button className='text-red-900 text-sm font-medium flex justify-center items-center'  onClick={() => handleBtnClick(blog)}>
                   <p>READ MORE</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="-7.5 -7.5 45.00 45.00">
                  <path fill="#e4217f" d="M24.168,5.918L31.127,12.879c0.412,0.418,0.729,0.942,0.873,1.503L32,15c0,0.77-0.292,1.54-0.873,2.121L25.168,24.082c-0.426-0.436-0.9-0.907-1.406-1.422L30.42,16H9.051c-0.027-0.331-0.051-0.663-0.051-1s0.024-0.669,0.051-1H30.42l-6.658-6.661c0.506-0.514,0.979-0.985,1.406-1.422z"/>
                 </svg>
               </button>
                
              </div>

            ))}
            
                  
            </div>
          
            
          
      </div>

    </>
  )
}

export default AllBlogs
