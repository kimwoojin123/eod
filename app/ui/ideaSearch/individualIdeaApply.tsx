'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getUsernameSomehow } from '../getUsername';

export default function IndividualIdeaApplyForm() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const path = usePathname();
  const ideaId = path.split('/').pop();


  const handleSubmit = async () => {
    try {
      const username = getUsernameSomehow();
      const response = await fetch('/api/individual-idea-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId:ideaId,
          username:username,
          content,
        }),
      });

      if (response.ok) {
        setMessage('아이디어 지원이 성공적으로 제출되었습니다.');
      } else {
        setMessage('아이디어 지원 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting idea support:', error);
      setMessage('아이디어 지원 제출에 실패했습니다.');
    }
  };

  return (
    <div className='flex flex-col w-96 mb-10'>
      <h1 className="text-xl font-bold mb-4">아이디어 지원하기</h1>
      <label htmlFor="content">내용:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="mb-4 w-full"
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        제출하기
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}