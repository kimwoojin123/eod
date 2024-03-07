'use client'

import React, { useState } from 'react';
import GptAI from '@/app/ui/ideaWrite/gptAI';
import dynamic from "next/dynamic";
import { getUsernameSomehow } from '@/app/ui/getUsername';
const DynamicTextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });
import { useRouter } from 'next/navigation';
import CustomModal from '@/app/ui/modal';

export default function IdeaWrite(){
  const [editorValue, setEditorValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const router = useRouter();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()}


  const handleEditorChange = (value : string) => {
    setEditorValue(value);
  };


  const handleTitleChange = (value : string) => {
    setTitle(value);
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
    const removeImageTagsAndContent = (html: string): string => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const images = doc.querySelectorAll('img');
      
      images.forEach((img) => img.remove());
      doc.body.innerHTML = doc.body.innerHTML.replace(/<img[^>]*>/g, ''); // 이미지 태그 삭제
      
      return doc.body.innerHTML;
    };
  
    const textContentForSubmission = removeImageTagsAndContent(editorValue);

    if (title.trim() === '') {
      setMessage('제목을 입력하세요.');
      openModal();
      return;
    }


    const username = getUsernameSomehow();
    
    const imageUrl = await uploadImage(editorValue);
    try{
    const response = await fetch('/api/idea/idea-save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        title,
        textContent : textContentForSubmission,
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
    <div className='overflow-x-hidden mt-10'>
      <div className='flex flex-col justify-center items-center h-full mr-20'>
        <h1 className='font-bold text-3xl mb-5 mr-80 text-white'>아이디어 작성</h1>
        <div className='flex w-screen justify-center mb-2'>
          <label htmlFor='title' className='text-white'>제목</label>
          <input className='w-1/3 mr-80 border-gray-400 border' type='text' id='title' value={title} onChange={(e) => handleTitleChange(e.target.value)} />
        </div>
        <div>
          <DynamicTextEditor value={editorValue} onChange={handleEditorChange} />
        </div>
      </div>
        <div className='absolute right-16'>
          <GptAI />
        <button onClick={handleSubmit} className='relative top-32 w-24 h-10 bg-green-500 text-white rounded-lg'>제출하기</button>
        </div>
      <div>
      </div>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
        <p>{message || '작성이 완료되었습니다.'}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
  );
}