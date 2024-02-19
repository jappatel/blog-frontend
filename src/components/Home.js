import React,{useEffect,useState} from 'react';
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

  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed
    return () => clearTimeout(timer);
  }, []);
  return (


   <div className='z-10 mt-24'>
      <Home_Nav />
      <div className='flex justify-center'></div>
      <div className='flex space-x-2 mx-4 sm:mx-0 border-y-black border-b-2 border-opacity-20'>
        <div className='flex flex-col'>
          <h1 className='font-light font-mono text-3xl text-gray-700 mb-4 mt-5'>Most Viewed Blogs</h1>
          {isLoading ? <div>Loading...</div> : <Home_view />}
        </div>
      </div>
      <div className='flex lg:flex-row md:flex-row mx-4 sm:mx-0 justify-center border-b-2 border-b-black border-opacity-20 flex-col sm:flex-row'>
        <div className='hidden sm:flex w-full md:w-1/2 flex-col space-x-5 mr-4 sm:mr-20'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl ml-4 text-gray-700'>Technology</h1>
            {isLoading ? <div>Loading...</div> : <Home_section1 />}
          </div>
        </div>
        <div className='w-full md:w-1/2 space-y-5'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl text-gray-700 mb-4 ml-4'>Health and fitness</h1>
            {isLoading ? <div>Loading...</div> : <Home_section2 />}
          </div>
        </div>
      </div>
      <div className='hidden sm:flex space-x-2 mx-4 sm:mx-0 border-y-black border-b-2 border-opacity-20'>
        <div className='flex flex-col'>
          <h1 className='font-light font-mono text-3xl text-gray-700 mb-4 mt-5 ml-4'>Food</h1>
          {isLoading ? <div>Loading...</div> : <Home_section3 />}
        </div>
      </div>
      <div className='hidden sm:flex'>
        <div className='w-2/5 px-4 sm:px-0 py-16 gap-5'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl text-gray-700 pb-5 ml-4'>Travel</h1>
            {isLoading ? <div>Loading...</div> : <Home_section5 />}
          </div>
        </div>
        <div className='w-2/3 px-4 sm:px-0'>
          <div className='flex flex-col'>
            <h1 className='font-light font-mono text-3xl text-gray-700 mt-4 ml-4'>Fashion and beauty</h1>
            {isLoading ? <div>Loading...</div> : <Home_section4 />}
          </div>
        </div>
      </div>
      <div className='flex justify-center opacity-85 hover:opacity-100'>
        <Link to="/allblogs">
          <button className='relative bg-gradient-to-r from-rose-400 to-fuchsia-400 p-2 rounded-2xl mb-5 font-normal'>Read More Blogs . . . </button>
        </Link>
      </div>
    </div>

  );
}

export default Home;

