import React from 'react';
import loginImage from '../assets/login-image.png';
import logo from '../assets/logo.png';
import ellipse from '../assets/ellipse.png';
import {
  createAuthUserWithEmailAndPassword,
  db,
} from '../utils/firebase';
import { useState } from 'react';

import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const SignUp = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;

    // Validations
    if (!displayName) {
      toast.error('Display Name is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Update user profile with only display name
      await updateProfile(response.user, { displayName });

      // Store user information in Firestore
      await setDoc(doc(db, 'users', response.user.uid), {
        uid: response.user.uid,
        displayName,
        email,
      });

      // Initialize userChats in Firestore (optional based on your logic)
      await setDoc(doc(db, 'userChats', response.user.uid), {});

      navigate('/'); // Navigate to home or another page after successful signup
    } catch (err) {
      console.error('Signup error: ', err);
      setErr(true); // Set error state if needed
    }
  };

  return (
    <>
      <div className='w-[100%] h-[100vh] flex items-center justify-center bg-body-gradient px-[76px]'>
        <div className='relative px-[58px] flex max-w-[1441px] h-[909px] w-[100%] bg-custom-gradient rounded-[35px] '>
          <img
            src={ellipse}
            className='absolute top-[710px] right-[1004px]'
            alt=''
          />
          <img
            className='absolute left-[68px] top-[44px] xs:hidden sm:hidden md:hidden lg:hidden xl:block'
            src={logo}
            alt='logo'
          />
          <div className='absolute left-0 w-[100%]'>
            <img
              className='min-w-[136px] mt-[44px] xs:inline sm:inline md:inline lg:inline xl:hidden'
              src={logo}
              alt='logo'
            />
          </div>
          <div
            style={{
              height: 'fit-content',
            }}
            className='flex justify-between mt-[260px]  w-[100%] max-w-[1018px] mx-[auto]'
          >
            <div className=''>
              <img
                className='loginImage xs:hidden sm:hidden md:hidden lg:hidden xl:block'
                src={loginImage}
                // alt='login image'
              />
            </div>

            <div className='w-[274px] flex flex-col xs:mx-[auto] sm:mx-[auto] md:mx-[auto] lg:mx-[auto] xl:mx-0'>
              <p className='text-[26px] text-[#ffffff] leading-[39px] font-medium'>
                Sign Up
              </p>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-[26px] mt-[39px]'>
                  <div className='relative'>
                    <input
                      style={{
                        outline: '1px solid #5B5B5B',
                      }}
                      className='h-[44px] w-[100%] rounded-[6px] bg-[#080D0D] caret-white  pl-[35px] text-[#fff]'
                      type='text'
                      placeholder='Display Name'
                    />
                    {/* <img
                    className='absolute left-[11px] top-[13px]'
                    src={emailLogo}
                    alt=''
                  /> */}
                  </div>
                  <div className='relative'>
                    <input
                      style={{
                        outline: '1px solid #5B5B5B',
                      }}
                      className='h-[44px] w-[100%] rounded-[6px] bg-[#080D0D] caret-white  pl-[35px] text-[#fff]'
                      type='text'
                      placeholder='Email'
                    />
                    {/* <img
                    className='absolute left-[11px] top-[13px]'
                    src={emailLogo}
                    alt=''
                  /> */}
                  </div>

                  <div className='relative'>
                    <input
                      style={{
                        outline: '1px solid #5B5B5B',
                      }}
                      className='h-[44px] w-[100%] rounded-[6px] bg-[#080D0D] caret-white  pl-[35px] text-[#fff]'
                      type='password'
                      placeholder='Password'
                    />
                    {/* <img
                    className='absolute left-[13px] top-[13px] '
                    src={passLogo}
                    alt=''
                  /> */}
                  </div>
                  <div className='relative'>
                    <input
                      style={{
                        outline: '1px solid #5B5B5B',
                      }}
                      className='h-[44px] w-[100%] rounded-[6px] bg-[#080D0D] caret-white  pl-[35px] text-[#fff]'
                      type='text'
                      placeholder='Confirm Password'
                    />
                    {/* <img
                    className='absolute left-[13px] top-[13px] '
                    src={passLogo}
                    alt=''
                  /> */}
                  </div>
                  <div className='flex gap-[10px] items-center'>
                    <input type='checkbox' name='' id='' />
                    <p className='text-[11px] text-[#ffffff] font-medium leading-[16.5px]'>
                      I agree to the Terms & Conditions
                    </p>
                  </div>
                </div>
                <button
                  type='submit'
                  className='h-[44px] w-[100%] mt-[45px] flex items-center justify-center rounded-[6px] bg-[#275DEA] text-[16px] text-[#ffffff] leading-[24px] font-semibold'
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
