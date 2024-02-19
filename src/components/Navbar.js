import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [authorName, setAuthorName] = useState(null); // State to store author name obtained from cookies
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  useEffect(() => {
    const authorName = Cookies.get('user_name');
    if (authorName) {
      setAuthorName(authorName); // Set the authorName state if 'user_name' cookie is present
    }

    // Clean up function
    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  return (
    <div className="z-20 top-0 flex justify-between items-center bg-zinc-100 px-10 py-4 fixed w-screen">
      <div className='flex items-center text-3xl'>
        <img className="w-10 mr-2" src="images/blog.png" alt="logo" />
        <span className="font-mono">QUICK</span>
      </div>

      <div className='flex gap-6 text-xl'>
        {!isSmallScreen && (
          <>
            <Link className='hover:text-blue-700' to="/">Home</Link>
            <Link className='hover:text-blue-700' to="/myblogs">My Blogs</Link>
            {authorName && <Link className='hover:text-blue-700' to="/write">Write</Link>} {/* Render only if authorName exists */}
          </>
        )}
        <div className='relative' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-xl hover:text-blue-700 focus:outline-none">
            <img className="w-8 h-8 rounded-full" src="images/user.png" alt="user photo" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              {isSmallScreen ? (
                <>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/">Home</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/myblogs">My Blogs</Link>
                  {authorName && <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/write">Write</Link>} {/* Render only if authorName exists */}
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/userinfo">Info</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/login">Logout</Link>
                </>
              ) : (
                <>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/userinfo">Info</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/login">Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
