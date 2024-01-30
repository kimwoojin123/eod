'use client'

import React, { useState } from 'react';
import GptAI from '@/app/ui/gptAI';
import dynamic from "next/dynamic";
import Modal from 'react-modal';

const DynamicTextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });


export default function IdeaWrite(){
  const [editorValue, setEditorValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  const handleEditorChange = (value : string) => {
    setEditorValue(value);
  };

  const uploadImage = async (dataURL: string) => {
    try {

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataURL,
        }),
      });

      const imageData = await response.json();
      return imageData.imageUrl; // 이미지 URL 반환
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  
  const handleSubmit = async () => {
    const textContent = editorValue;

    const imageUrl = await uploadImage(editorValue);
    try{
    const response = await fetch('/api/idea-save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        textContent,
        imageUrl,
      }),
    });

    const result = await response.json();
    setMessage('');
    openModal();
    console.log(result);
  } catch {
    setMessage('제출에 실패했습니다');
    openModal();
  }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='font-bold text-3xl mb-5'>아이디어 작성</h1>
        <DynamicTextEditor value={editorValue} onChange={handleEditorChange} />
      </div>
      <GptAI />
      <div className='flex justify-center relative left-72 bottom-14'>
        <div className='flex w-56 justify-between'>
          <button className='w-24 h-10 bg-green-500 text-white rounded-lg'>저장하기</button>
          <button onClick={handleSubmit} className='w-24 h-10 bg-green-500 text-white rounded-lg'>제출하기</button>
        </div>
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
        contentLabel="아이디어 제출 모달"
      >
        <p>{message || '작성이 완료되었습니다.'}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  )
}