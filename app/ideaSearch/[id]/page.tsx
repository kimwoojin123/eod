'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/app/ui/Buttons/backButton';

interface DetailPageProps {
  username: string;
  title: string;
  addDate: string;
  imageUrl: string;
  textContent: string;
}

export default function DetailPage() {

  const [boardData, setBoardData] = useState<DetailPageProps | null>(null);
  const searchPath = usePathname();
  const id = searchPath.split('/').pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/id-board/${id}`);
        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        console.error('Error fetching detail data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <BackButton />
      <div className="mx-auto p-4 max-w-2xl border">
        <h1 className="text-2xl font-bold mb-4 border-b pb-2">{boardData.title}</h1>
        <p className="text-gray-500 mb-2 border-b pb-2">작성자 : {boardData.username}</p>
        <p className="text-gray-500 mb-4 border-b pb-2">{boardData.addDate}</p>
        {boardData.imageUrl && (
        <Image src={boardData.imageUrl} alt="Image" width={500} height={500} className="mb-4" />
        )}
        <div className='prose' dangerouslySetInnerHTML={{ __html: boardData.textContent }} />
      </div>
    </div>
  );
  }