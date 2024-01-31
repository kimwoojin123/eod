'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const TextEditor = dynamic(() => import('@/app/ui/textEditor'), { ssr: false });

interface EditPageProps {
  initialContent: string;
}

const EditPage: React.FC<EditPageProps> = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const router = useRouter();
  const path = usePathname();
  const id = path.split('/').slice(-2, -1)[0];  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/id-board/${id}`);
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
      const response = await fetch(`/api/idea-update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          textContent: content,
        }),
      });

      if (response.ok) {
        console.log('데이터가 성공적으로 업데이트되었습니다.');
        router.push(`/ideaSearch/${id}/page`);
      } else {
        console.error('데이터를 업데이트하는 중에 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancel = () => {
    router.push(`/ideaSearch/${id}/page`);
  };


  return (
    <div>
      <div className='w-screen flex justify-center mb-2'>
        <label htmlFor='title'>제목</label>
        <input className='ml-10 w-1/3 border-gray-400 border' type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <TextEditor value={content} onChange={setContent} />
      </div>
      <div>
        <button onClick={handleSave}>저장</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

export default EditPage;