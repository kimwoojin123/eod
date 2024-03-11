'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import CustomModal from '../modal';
import { getUsernameSomehow } from '../getUsername';

export function ReloadButton(){
  const reloadPage = () =>{
    window.location.href="/"
  }
  return (
    <button className="text-white font-bold text-3xl" onClick={reloadPage}>EveryOneDeveloper</button>
  )
}


export function MyPageButton(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = getUsernameSomehow();

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    setIsLoggedIn(!!storageToken);
  }, []);

  const handleMyPageClick = () => {
      window.location.href = '/mypage';
  };

  return (
    <div>
      {isLoggedIn ? (
      <button className="text-white font-bold pt-4 pr-4" onClick={handleMyPageClick}>{username}님</button>    
      ) : (
        null
      )}
    </div>
  )
}


export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    setIsLoggedIn(!!storageToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='cursor-pointer'>
          <p className=" text-white font-bold w-20 h-10 pr-4 pt-4" onClick={handleLogout}>Logout</p>
        </div>
      ) : (
        <div className='w-48 flex justify-between'>
          <Link href='login'><p className="flex justify-center items-center text-white font-bold w-20 h-10 pt-3">Login</p></Link>
          <Link href='signup'><p className="flex justify-center items-center text-white font-bold w-20 h-10 pr-4 pt-3">SignUp</p></Link>
        </div>
      )}
    </div>
  );
}