'use client'

import { getUsernameSomehow } from "@/app/ui/getUsername"
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';

interface Idea {
  _id: string;
  title: string;
  addDate: string;
}

export default function IdeaRequest() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const path = usePathname();
  const teamId = path.split('/')[2]
  
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

  const handleSelectIdea = (id: string) => {
    if (selectedIdea === id) {
      setSelectedIdea(null); // 이미 선택된 아이디어를 다시 클릭하면 선택 취소
    } else {
      setSelectedIdea(id);
    }
  };

  const handleRequest = async () => {
    if (!selectedIdea) {
      console.error('No idea selected');
      return;
    }
    try {
      const username = getUsernameSomehow();
      const response = await fetch(`/api/idea-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          selectedIdea,
          username,
          teamId
        })
      });
      if (!response.ok) {
        throw new Error('Failed to request idea');
      }
      // 성공적으로 의뢰가 완료되면 여기에 추가 작업을 수행할 수 있습니다.
      console.log('Idea requested successfully');
    } catch (error) {
      console.error('Error requesting idea:', error);
    }
  };

  return (
    <div>
      {ideas.map((idea) => (
        <div className='flex' key={idea._id}>
          <input
            type="checkbox"
            checked={selectedIdea === idea._id}
            onChange={() => handleSelectIdea(idea._id)}
          />
          <h3>{idea.title}</h3>
          <h3>{idea.addDate}</h3>
        </div>
      ))}
      <button onClick={handleRequest} disabled={!selectedIdea}>
        의뢰하기
      </button>
    </div>
  );
}