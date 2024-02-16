import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://quick-1k8t.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),

      });

      if (response.ok) {
        // Login successful, handle redirect or other actions here
        const data = await response.json(); // Parse response body
        const userId = data.name;
         // Assuming the server returns user ID as 'userId'
        navigate('/');
        console.log('Login successful');
        console.log('User ID:', userId); // Log user ID
        alert('Login successful');
        
        // Calculate the number of seconds in one day
           var oneDayInSeconds = 60 * 60 * 24;

        // Save user's name in a cookie
        document.cookie = `user_name=${data.name};  max-age=${oneDayInSeconds}`; // Adjust max-age as needed
      } else {
        const data = await response.json();
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className=' '>
          <div className='mt-20 bg-white mb-16 h-96 p-10 rounded-lg shadow-lg shadow-gray-400  '>
            <h1 className=' text-3xl text-gray-700 font-semibold '>Login</h1>
            <h1 className='font-normal text-gray-400 mb-3'>Doesn't have an account yet? <Link className="text-blue-500 underline" to="/signup">Sign Up</Link></h1>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <label className='text-xl text-gray-600'>Email address</label>
              <input
                type='text'
                className='border-2 border-red-500 border-opacity-25 rounded-lg'
                placeholder='abc@abc.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='text-xl text-gray-600'>Password <Link to="/forgot" className='text-blue-500 text-xs underline'>Forgot password</Link></label>
              <input
                className='border-2 border-red-500 border-opacity-25 rounded-lg'
                type='password'
                
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="mt-5 p-2 w-36 ml-16 mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400" type='submit'>LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;










// import React from 'react'
// import { Link } from 'react-router-dom';

// const Login = () => {
//   return (
//     <>
//    <div className='flex justify-center items-center'>

//     <div className=' '> 

//         <div  className='mt-20 bg-white mb-16 h-96 p-10 rounded-lg shadow-xl '>

//           <h1 className=' text-3xl text-gray-700 font-semibold '>Login</h1>
//           <h1 className='font-normal text-gray-400 mb-3'>Doesn't have an account yet? <Link  className="text-blue-500 underline" to="/signup">Sign Up</Link></h1>

//           <form className='flex flex-col  gap-2'>
//             <label className='text-xl text-gray-600'>Email address</label>
//             <input type='text' className='border-2 border-red-500 border-opacity-25 rounded-lg' placeholder='abc@abc.com'></input>
//             <label className='text-xl text-gray-600'>Password <Link to="/forgot " className='text-blue-500 text-xs underline'>Forgot password</Link></label>
//             <input className='border-2 border-red-500 border-opacity-25 rounded-lg' type='Password' maxLength={6} placeholder='Enter 6 digit password'></input>
//             <button className="mt-5 p-2 w-36 ml-16 mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400" type='submit'>LOGIN</button>


//           </form>
//         </div>


    
//     </div>
//    </div>

//     </>
//   )
// }

// export default Login