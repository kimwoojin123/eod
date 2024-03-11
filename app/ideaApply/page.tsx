'use client'

import { IdeaWriteButton, IdeaDrawButton } from "../ui/Buttons/ideaApplyButtons"
import BackButton from "../ui/Buttons/backButton"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import CustomModal from "../ui/modal"

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
      <div className="flex h-full justify-around items-center mt-80 mr-28">
        <IdeaWriteButton />
      </div>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width="360px" height="180px">
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  )
}