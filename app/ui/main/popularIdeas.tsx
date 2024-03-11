'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface Idea {
  _id: string;
  username: string;
  title: string;
  likes:number;
  replies:string;
}

export default function PopularIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularIdeas = async () => {
      try {
        const response = await fetch('/api/idea/board-list', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch popular ideas');
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const sortedIdeas = data.sort((a: Idea, b: Idea) => b.likes - a.likes).slice(0, 10);
          setIdeas(sortedIdeas);
        } else {
          throw new Error('Invalid data structure: ideas field not found');
        }
      } catch (error) {
        console.error('Error fetching popular ideas:', error);
      }
    };

    fetchPopularIdeas();
  }, []);

  const handleIdeaClick = (id: string) => {
    router.push(`/ideaSearch/${id}`);
  };

  return (
    <div className='w-3/12 mt-10'>
      <h1 className="text-xl text-white mb-4">Popular Idea</h1>
      <div className='flex flex-col mix-blend-screen bg-white/10 rounded-3xl' style={{ height: '580px' }}>
      {ideas.map((idea, index) => (
        <div key={idea._id} className="flex flex-col mt-2 pl-4 pr-4 h-14 justify-center cursor-pointer hover:bg-black" onClick={() => handleIdeaClick(idea._id)}>
          <p className="flex hover:underline text-white text-sm">{`${index + 1}. ${idea.username} - ${idea.title}`}
          <HeartIcon className='w-4 h-4 text-pink-700 ml-2 mt-0.5'/>{idea.likes}
          <ChatBubbleOvalLeftEllipsisIcon className='w-4 h-4 ml-3 mt-0.5'/>{idea.replies?.length || 0}
        </p>
        </div>
      ))}
      </div>
    </div>
  );
}