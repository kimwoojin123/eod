'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import CustomModal from '../modal';

export function ReloadButton(){
  const reloadPage = () =>{
    window.location.href="/"
  }
  return (
    <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reloadPage}>EveryOneDeveloper</button>
  )
}


export function MyPageButton(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    setIsLoggedIn(!!storageToken);
  }, []);

  const handleMyPageClick = () => {
    if (isLoggedIn) {
      window.location.href = '/mypage';
    } else {
      setMessage('로그인이 필요합니다.');
      openModal();
    }
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleMyPageClick}>마이페이지</button>    
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
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
          <span className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded" onClick={handleLogout}>로그아웃</span>
        </div>
      ) : (
        <div className='w-48 flex justify-between'>
          <Link href='login'><p className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold w-20 h-10 rounded">로그인</p></Link>
          <Link href='signup'><p className="flex justify-center items-center bg-blue-500 hover:bg-green-700 text-white font-bold w-20 h-10 rounded">회원가입</p></Link>
        </div>
      )}
    </div>
  );
}