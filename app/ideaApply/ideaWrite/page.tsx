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
          <button className='w-24 h-10 bg-green-500 text-white rounded-lg'>제출하기</button>
        </div>
      </div>
    </div>
  )
}