import React, { useEffect, useState, useRef } from 'react';
import Home_section3 from './Home_section3';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const location = useLocation();
  const selectedBlog = location.state.selectedBlog;
  const authorName = Cookies.get('user_name');

  const [h1Tags, setH1Tags] = useState([]);
  const [h2Tags, setH2Tags] = useState([]);

  const contentRef = useRef(null); // Define contentRef here

  useEffect(() => {
    // Scroll to the top of the page when selectedBlog changes
    window.scrollTo(0, 0);
    if (selectedBlog && selectedBlog.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedBlog.content, 'text/html');

      const h1Elements = doc.querySelectorAll('h1');
      h1Elements.forEach((h1, index) => {
        h1.id = `h1-${index}`;
      });
      const h1Tags = Array.from(h1Elements).map(tag => tag.textContent);

      const h2Elements = doc.querySelectorAll('h2');
      h2Elements.forEach((h2, index) => {
        h2.id = `h2-${index}`;
      });
      const h2Tags = Array.from(h2Elements).map(tag => tag.textContent);

      setH1Tags(h1Tags);
      setH2Tags(h2Tags);

      // Update the contentRef after setting IDs
      contentRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [selectedBlog]);

  const handleH1Click = (index) => {
    console.log("Clicked on h1 index:", index);
    const targetElement = contentRef.current.querySelector(`#h1-${index}`);
    scrollToElement(targetElement);
  };

  const handleH2Click = (index) => {
    console.log("Clicked on h2 index:", index);
    const targetElement = contentRef.current.querySelector(`#h2-${index}`);
    scrollToElement(targetElement);
  };

  const scrollToElement = (targetElement) => {
    const headerHeight = 70; // Adjust this value according to the actual height of your fixed header
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    } else {
      console.error("Target element not found.");
    }
  };

  return (
    <>
    
    <div className='flex justify-evenly mt-32 flex-col md:flex-row'>
  {/* Conditionally render the TOC only on medium-sized screens and above */}
  <div className='hidden md:block'>
    <h1 className="font-bold text-2xl mb-5 fixed top-20">Table of contents</h1>
    <ul className='fixed top-36 text-lg font-semibold'>
      {h1Tags.map((tag, index) => (
        <li className='hover:text-red-600 hover:text-xl' key={index} onClick={() => handleH1Click(index)} style={{ cursor: 'pointer' }}>{tag.split(' ').slice(0, 3).join(' ')}</li>
      ))}
      {h2Tags.map((tag, index) => (
        <li className='hover:text-red-600 hover:text-xl' key={index} onClick={() => handleH2Click(index)} style={{ cursor: 'pointer' }}>{tag.split(' ').slice(0, 3).join(' ')}</li>
      ))}
    </ul>
  </div>
  <div className='flex flex-col w-full md:w-1/2'>
    <div className='justify-between flex flex-col md:flex-row'>
      <div>
        <p className='text-start md:text-center ml-5 md:ml-0'>{new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
        <p className='text-start md:text-center ml-5 md:ml-0'>{selectedBlog.author}</p>
      </div>
      <div className='flex gap-5 pr-4 text-red-600'>
        {authorName === selectedBlog.author ? (
          <h1 className='cursor-pointer'>
            <Link key={selectedBlog._id} to={{ pathname: `/editblog/${selectedBlog._id}`, state: { postId: selectedBlog._id } }}>EDIT</Link>
          </h1>
        ) : null}
        <h1 className="cursor-pointer">SHARE</h1>
      </div>
    </div>
    <p className='text-center font-bold text-4xl font-serif pt-5 pb-10'>{selectedBlog.title}</p>
    <div ref={contentRef} className='text-start select-none text-xl' dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
  </div>
</div>

      
    </>
  );
};

export default Blog;



