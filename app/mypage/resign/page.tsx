'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsernameSomehow } from "@/app/ui/getUsername";
import Modal from 'react-modal'

export default function Resign() {
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => { setModalIsOpen(false); localStorage.removeItem("token"); router.push('/')}

  const handleResign = async () => {
    try {
      const username = getUsernameSomehow(); 
      await fetch("/api/resign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
          setMessage('회원 탈퇴가 완료되었습니다.')
          openModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center w-lvw h-lvh'>
      <h1 className='flex justify-center w-60 h-10 items-center text-white bg-red-500 font-bold'>정말 탈퇴하시겠습니까?</h1><br />
      <button className="hover:underline" onClick={handleResign}>탈퇴하기</button>
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
        contentLabel="회원탈퇴 모달"
        >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}
