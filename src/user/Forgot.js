import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleGetOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' https://quick-1k8t.onrender.com/api/forgetpw', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching OTP:', error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' https://quick-1k8t.onrender.com/api/resetpw', {
        email,
        otp,
        newPassword
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className=' '>
          <div className='mt-20 bg-white mb-16  p-10 rounded-lg shadow-xl '>
            <h1 className=' text-3xl text-gray-700 font-semibold mb-5 '>Forgot Password ?</h1>
            <form className='flex flex-col gap-2'>
              <label className='text-xl text-gray-600'>Email</label>
              <input
                type='text'
                className='border-2 border-red-500 border-opacity-25 rounded-lg'
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="mt-5 p-2 w-2/3 ml-12  mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400"
                onClick={handleGetOtp}
              >
                Get Otp
              </button>
              {message && <p>{message}</p>}
              {otp && (
                <>
                  <label className='text-xl text-gray-600'>OTP</label>
                  <form className="max-w-sm mx-auto">
                    {/* Your OTP input fields */}
                  </form>
                  <button
                    className="mt-5 p-2 mb-5 rounded-xl border-2 border-red-900 bg-red-500 hover:bg-red-400"
                    onClick={handleResetPassword}
                  >
                    Reset
                  </button>
                </>
              )}
            </form>
            <h1 className='font-normal text-gray-400 mb-3'>
              Go to login page <Link className="text-blue-500 underline" to="/login">Login</Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
