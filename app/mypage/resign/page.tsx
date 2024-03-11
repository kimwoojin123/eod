'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsernameSomehow } from "@/app/ui/getUsername";
import CustomModal from "@/app/ui/modal";

export default function Resign() {
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => { setModalIsOpen(false); localStorage.removeItem("token"); router.push('/')}

  const handleResign = async () => {
    try {
      const username = getUsernameSomehow(); 
      await fetch("/api/user/resign", {
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
    <div className='flex flex-col justify-center items-center w-full mt-96 pr-10'>
      <h1 className='flex justify-center w-60 h-10 items-center text-white bg-red-500 font-bold'>정말 탈퇴하시겠습니까?</h1><br />
      <button className="hover:underline text-white" onClick={handleResign}>탈퇴하기</button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width="360px" height="180px">
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  );
}
