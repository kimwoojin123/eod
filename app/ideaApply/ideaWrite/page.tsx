'use client'

import React, { useState } from 'react';
import GptAI from '@/app/ui/gptAI';
import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });


export default function IdeaWrite(){
  const [editorValue, setEditorValue] = useState<string>('');

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
    console.log(result);
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
    </div>
  )
}