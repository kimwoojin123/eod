'use client'

import { IdeaWriteButton, IdeaDrawButton } from "../ui/Buttons/ideaApplyButtons"
import BackButton from "../ui/Buttons/backButton"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Modal from 'react-modal';

export default function IdeaApply(){
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.push('/login');}

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('로그인이 필요합니다.')
      openModal()
    }
    return () => {
    };
  }, [router]);
  
  return (
    <div>
      <div className="relative top-10 left-10">
      <BackButton />
      </div>
      <div className="flex h-screen justify-around items-center">
        <IdeaWriteButton />
        <IdeaDrawButton />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
        contentLabel="로그인 확인 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  )
}