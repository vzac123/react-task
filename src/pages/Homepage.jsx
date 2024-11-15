import React from 'react';
import logo from '../assets/logo.png';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setAuthStatus } from '../store/User';
import { signOut } from 'firebase/auth';
import { setUser } from '../store/User';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    console.log('log');
    signOut(auth);
    dispatch(setAuthStatus(false));
    dispatch(setUser({}));
  };
  return (
    <>
      <div className='w-[100%] relative  h-[100vh] flex items-center justify-center bg-body-gradient bg-custom-gradient px-[76px]'>
        <img
          className='absolute left-[68px] top-[44px] '
          src={logo}
          alt='logo'
        />
        <button
          onClick={logout}
          className='h-[44px] px-[20px] flex items-center justify-center rounded-[6px] bg-[#275DEA] text-[16px] text-[#ffffff] leading-[24px] font-semibold  absolute right-[68px] top-[44px]'
        >
          Logout
        </button>
        <div className='flex flex-col'>
          <p
            onClick={() => navigate('/posts')}
            className='text-[24px] text-[#ffffff] cursor-pointer text-center underline'
          >
            <span className='text-[#275DEA]'> Posts</span> List Page
          </p>
          <p className='text-[28px] text-[#ffffff] mt-[20px]'>
            Welcome To Homepage
          </p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
