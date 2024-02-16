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
    <div className='divHome  bg-slate-200 px-20 py-20 flex justify-start items-center'>

    <div className='w-1/2 space-y-4  text-pretty   ' >

        {/* <h1 className='text-4xl font-bold'>Website evi banavani ,loko ke kasek thi uthayeli che...</h1> */}
        <h1 className='text-4xl font-bold'>A Blog for Passionate People and Website Lovers</h1>
        <h2 className='text-xl font-light'>Wealth Creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.</h2>
        {/* <button className='relative bg-gradient-to-r from-rose-400 to-fuchsia-400 p-2 rounded-2xl' onClick={handleReadArticleClick}>READ ARTICLE</button> */}
        
    </div>
</div>


    </>
  )
}

export default Home_Nav
