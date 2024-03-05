'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useRouter } from 'next/navigation'
import BackButton from '@/app/ui/Buttons/backButton';
import CustomModal from '@/app/ui/modal';

export default function TeamApply() {
  const [stack, setStack] = useState('');
  const [content, setContent] = useState('');
  const idPath = usePathname();
  const id = idPath.split('/')[2];
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()}


  const handleSubmit = async () => {
    try {
      const username = getUsernameSomehow();
      const response = await fetch(`/api/team/team-apply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          stack,
          content,
        }),
      });
      if (response.ok) {
        setMessage('제출이 완료되었습니다.')
        openModal();
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
          <div className='absolute left-6 top-20'>
    <BackButton />
    </div>
      <h1 className="mb-20 font-bold text-2xl">해당 팀에 지원하시겠습니까?</h1>
      <form className="flex flex-col w-1/3">
        <label>가능스택 :</label>
        <input
          type="text"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          className="border-gray-500 border mb-5"
          required
        />
        <label>지원내용 :</label>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border-gray-500 border mb-5"
          required
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white"
        >
          제출
        </button>
      </form>
    <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  );
}