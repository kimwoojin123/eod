'use client'

import React, { useState } from 'react';
import TextEditor from "@/app/ui/textEditor"

export default function IdeaWrite(){
  const [editorValue, setEditorValue] = useState<string>('');

  const handleEditorChange = (value : string) => {
    setEditorValue(value);
  };
  return (
    <div>
      <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='font-bold text-3xl mb-5'>아이디어 작성</h1>
        <TextEditor value={editorValue} onChange={handleEditorChange} />    
      </div>
    </div>
  )
}