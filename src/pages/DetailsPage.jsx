import React from 'react';
import logo from '../assets/logo.png';
import { useParams } from 'react-router-dom';
import { httpClient } from '../axios';
import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setAuthStatus } from '../store/User';
import { signOut } from 'firebase/auth';
import { setUser } from '../store/User';

const DetailsPage = () => {
  const { postID } = useParams();
  const dispatch = useDispatch();

  const [post, setpost] = useState({});

  const getPostById = async () => {
    try {
      const res = await httpClient.get(`/posts/${postID}`);
      setpost(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  const logout = () => {
    console.log('log');
    signOut(auth);
    dispatch(setAuthStatus(false));
    dispatch(setUser({}));
  };

  return (
    <div className='w-[100%] relative  h-[100%] flex bg-[#080d0d] px-[76px]'>
      <img
        className='absolute left-[68px] top-[44px]'
        src={logo}
        alt='logo'
      />
      <button
        onClick={logout}
        className='h-[44px] px-[20px] flex items-center justify-center rounded-[6px] bg-[#275DEA] text-[16px] text-[#ffffff] leading-[24px] font-semibold  absolute right-[68px] top-[44px]'
      >
        Logout
      </button>

      <div className='flex flex-col w-[100%]'>
        <p className='text-[32px] text-[#fff] font-medium mt-[150px] text-center'>
          Detail Page
        </p>

        <div></div>
        <div class='max-w-sm rounded overflow-hidden shadow-box py-[50px] mx-[auto] mt-[100px]'>
          <div class='px-6 py-4'>
            <div class='font-bold text-xl text-[#ffffff] mb-2'>
              {post?.title}
            </div>
            <p class='text-gray-700 text-base'>{post?.body}</p>
          </div>
          <div class='px-6 pt-4 pb-2'>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              #photography
            </span>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              #travel
            </span>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              #winter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
