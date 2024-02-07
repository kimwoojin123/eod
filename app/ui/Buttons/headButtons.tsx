'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'

export function ReloadButton(){
  const reloadPage = () =>{
    window.location.href="/"
  }
  return (
    <button onClick={reloadPage}>EveryOneDeveloper</button>
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
      <button onClick={handleMyPageClick}>마이페이지</button>    
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
          },
          content: {
            display:"flex",
            flexDirection : "column",
            alignItems : 'center',
            width: "360px",
            height: "180px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            whiteSpace: 'pre-line',
          },
        }}
        contentLabel="로그인 요구 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
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