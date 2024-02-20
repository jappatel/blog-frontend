import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';

const Home_Nav = () => {

  const navigate = useNavigate();

  const handleReadArticleClick = () => {
    navigate('/blog');
  };


  return (
    <>
    <div className='divHome bg-slate-200 px-10 py-10 md:px-20 md:py-20 flex justify-start items-center'>

        <div className='w-full md:w-1/2 space-y-4 text-pretty'>

            <h1 className='text-4xl font-bold'>A Blog for Passionate People and Website Lovers</h1>
            <h2 className='text-xl font-light'>Wealth Creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.</h2>

        </div>
    </div>
</>
  )
}

export default Home_Nav
