import React from 'react'

import { Link } from 'react-router-dom';

const Forgot = () => {
  return (
    <>
   <div className='flex justify-center items-center'>

    <div className=' '> 

        <div  className='mt-20 bg-white mb-16 h-96 p-10 rounded-lg shadow-xl '>

          <h1 className=' text-3xl text-gray-700 font-semibold mb-5 '>Forgot Password ?</h1>

          <form className='flex flex-col gap-2'>
            <label className='text-xl text-gray-600'>Email</label>
            <input type='text' className='border-2 border-red-500 border-opacity-25 rounded-lg' placeholder='Enter your Email'></input>
            <label className='text-xl text-gray-600'>OTP</label>
            <input type='text' className='border-2 border-red-500 border-opacity-25 rounded-lg' placeholder='Enter 6 digit OTP'></input>
           
            <button className="mt-5 p-2  mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400" type='submit'>Reset</button>


          </form>

          <h1 className='font-normal text-gray-400 mb-3'>Go to login page <Link  className="text-blue-500 underline" to="/login">Login</Link></h1>

        </div>


    
    </div>
   </div>

    </>
  )
}

export default Forgot