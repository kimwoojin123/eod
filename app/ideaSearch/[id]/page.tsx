'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DetailPageProps {
  username: string;
  title: string;
  addDate: string;
  imageURL: string;
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
    <div>
      <h1>{boardData.title}</h1>
      <p>{boardData.username}</p>
      <p>{boardData.addDate}</p>
      <Image src={boardData.imageURL} alt="Image" width={500} height={500} />
      <p>{boardData.textContent}</p>
    </div>
  );
}