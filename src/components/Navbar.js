import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {

    
   
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let authorName = Cookies.get('user_name');
  console.log(authorName)
 


  



  return (
    <div className="z-20 top-0 flex justify-between items-center bg-zinc-100 px-10 py-4 fixed w-screen">
      <div className='flex items-center text-3xl'>
        <img className="w-10 mr-2" src="images/blog.png" alt="logo" />
        <span className="font-mono">QUICK</span>
        <h1 className='text-lg ml-4 font-semibold text-red-600'>{authorName}</h1>
      </div>

      <div className='flex gap-6 text-xl'>
        <Link className='hover:text-blue-700' to="/">Home</Link>
        {authorName && <Link className='hover:text-blue-700 text-red-600' to="/write">Write</Link>}
        <Link className='hover:text-blue-700' to="/myblogs">My Blogs</Link>
        <div className='relative' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-xl hover:text-blue-700 focus:outline-none">
            <img className="w-8 h-8 rounded-full" src="images/user.png" alt="user photo" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Link to="/userinfo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">info</Link>
              <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
