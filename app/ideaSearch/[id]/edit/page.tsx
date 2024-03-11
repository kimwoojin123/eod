'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const TextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });




export default function EditPage() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();
  const path = usePathname();
  const id = path.split('/').slice(-2, -1)[0];  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/idea/id-board/${id}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
        setTitle(data.title); 
        setContent(data.textContent); 
      } catch (error) {
        console.error('Error fetching detail data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);



  const handleSave = async () => {
    try {
      const response = await fetch(`/api/idea/idea-edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title:title,
          textContent: content,
        }),
      });

      if (response.ok) {
        console.log('데이터가 성공적으로 업데이트되었습니다.');
        router.push(`/ideaSearch/${id}`);
      } else {
        console.error('데이터를 업데이트하는 중에 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancel = () => {
    router.push(`/ideaSearch/${id}`);
  };


  return (
    <div className='mt-20 flex flex-col w-full items-center'>
      <div className='flex mb-4 w-1/2 ml-20'>
        <label htmlFor='title' className='w-12 text-white'>제목</label>
        <input className='w-10/12 border-gray-400 border' type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <TextEditor value={content} onChange={setContent} />
      </div>
      <div className='flex w-48 justify-between relative top-10 left-80'>
        <button className='w-20 h-10 rounded-2xl bg-red-500 text-white mt-5' onClick={handleSave}>저장</button>
        <button className='w-20 h-10 rounded-2xl bg-red-500 text-white mt-5' onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

