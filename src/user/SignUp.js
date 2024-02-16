import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUP = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        // Optionally, you can handle successful signup
        console.log('User signed up successfully');
        alert(` Thank you ${name} ! for register with us ... `);
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div>
        <div className='mt-20 bg-white mb-16 h-96 p-10 rounded-lg shadow-xl '>
          <h1 className='text-3xl text-gray-700 font-semibold mb-5'>Sign up</h1>
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <label className='text-xl text-gray-600'>Name</label>
            <input
              type='text'
              className='border-2 border-red-500 border-opacity-25 rounded-lg'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className='text-xl text-gray-600'>Email</label>
            <input
              type='email'
              className='border-2 border-red-500  w-72 border-opacity-25 rounded-lg'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='text-xl text-gray-600'>Password</label>
            <input
              type='password'
              className='border-2 border-red-500 border-opacity-25 rounded-lg'
              placeholder='Enter your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="mt-5 p-2 mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400"
              type='submit'
            >
              Sign up
            </button>
          </form>
          <h1 className='font-normal text-gray-400 mb-3'>
            Go to login page <Link className="text-blue-500 underline" to="/login">Login</Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUP;







