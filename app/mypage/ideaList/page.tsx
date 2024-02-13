'use client'

import { useEffect, useState } from 'react';
import { getUsernameSomehow } from '@/app/ui/getUsername';

interface Idea {
  _id: string;
  title: string;
  addDate: string;
}

export default function IdeaList() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const username = getUsernameSomehow();
        const response = await fetch(`/api/user-ideas/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user ideas');
        }
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error('Error fetching user ideas:', error);
      }
    };

    fetchIdeas();
  }, []);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">내가 작성한 아이디어 목록</h1>
      <ul>
        {ideas.map((idea) => (
          <li key={idea._id} className="mb-4">
            <h2 className="text-lg font-semibold">{idea.title}</h2>
            <p className="text-gray-500">작성일: {idea.addDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}