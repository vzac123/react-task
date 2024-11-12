import React from 'react';
import logo from '../assets/logo.png';
import { httpClient } from '../axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { setAuthStatus } from '../store/User';
import { setUser } from '../store/User';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const getPosts = async () => {
    try {
      const res = await httpClient.get(`/posts`);
      setPosts(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    console.log('log');
    signOut(auth);
    dispatch(setAuthStatus(false));
    dispatch(setUser({}));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='w-[100%] relative  h-[100%] flex bg-[#080d0d] px-[76px]'>
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
      <div className='flex flex-wrap gap-[50px] pt-[150px] w-[100%] px-[50px] justify-center'>
        {posts?.map((post) => (
          <div
            onClick={() => {
              navigate(`/posts/${post?.id}`);
            }}
            className='max-w-sm rounded overflow-hidden shadow-box py-[50px] cursor-pointer'
          >
            <div className='px-6 py-4'>
              <div className='font-bold text-xl text-[#ffffff] mb-2'>
                {post?.title}
              </div>
              <p className='text-gray-700 text-base'>{post?.body}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #photography
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #travel
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                #winter
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
