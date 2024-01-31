'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';


export function ReloadButton(){
  const reloadPage = () =>{
    window.location.href="/"
  }
  return (
    <button onClick={reloadPage}>EveryOneDeveloper</button>
  )
}


export function MyPageButton(){
  return (
    <button>마이페이지</button>
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
        <div className='cursor-pointer' onClick={handleLogout}>
          <span>로그아웃</span>
        </div>
      ) : (
        <>
        <div className='w-40 flex justify-between'>
          <Link href='login'>로그인</Link>
          <Link href='signup'>회원가입</Link>
        </div>
        </>
      )}
    </div>
  );
}