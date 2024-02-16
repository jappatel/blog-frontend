import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom'; 
import Home_Nav from './Home_Nav';
import Home_section1 from './Home_section1';
import Home_section2 from './Home_section2';
import Home_section3 from './Home_section3';
import Home_section4 from './Home_section4';
import Home_section5 from './Home_section5';
import Home_view from './Home_view';

const Home = () => {
  return (
    <div className='z-10 mt-24 ' >
      <Home_Nav />
      <div className='flex justify-center'>
       

      </div>
      
      <div className='flex space-x-2 mx-24   border-y-black border-b-2 border-opacity-20 '>
        <div className='flex flex-col  '>
          <h1 className='font-light font-mono text-3xl text-gray-700 mb-4 mt-5 '>Most Viewed Blogs</h1>
          <Home_view />
        </div>
      </div>


      <div className='flex flex-row mx-24   justify-center border-b-2 border-b-black border-opacity-20'>
        <div className='w-1/2 flex space-x-5  mr-20'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl ml-10 text-gray-700'>Technology</h1>
            <Home_section1 />
          </div>
        </div>
        <div className='w-1/2 space-y-5 '>

         <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl text-gray-700 mb-10'>Health and fitness</h1>
            <Home_section2 />
          </div>
        </div>
      </div>
      <div className='flex space-x-2 mx-24   border-y-black border-b-2 border-opacity-20 '>
        <div className='flex flex-col  '>
          <h1 className='font-light font-mono text-3xl text-gray-700 mb-4 mt-5 '>Food</h1>
          <Home_section3 />
        </div>
      </div>
      <div className='flex '>
        <div className='w-2/5 pl-24 py-16 gap-5 '>
          <div className='flex flex-col '>
            <h1 className='font-light font-mono text-3xl text-gray-700 pb-5'>Travel</h1>
            <Home_section5 />
          </div>
        </div>
        <div className='w-2/3'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl text-gray-700 ml-10 mt-14'>Fashion and beauty</h1>
            <Home_section4 />
          </div>
        </div>
      </div>
      <div className='flex justify-center opacity-85 hover:opacity-100'> {/* Wrapping button in a flex container and justifying its content to center */}
      <Link to="/allblogs">
          <button className='relative bg-gradient-to-r from-rose-400 to-fuchsia-400 p-2 rounded-2xl mb-5 font-normal'>Read More Blogs . . . </button>
        </Link>

      </div>
    </div>
  );
}

export default Home;

