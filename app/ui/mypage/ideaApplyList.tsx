'use client'

import { useEffect, useState } from 'react';

interface AppliedIdea {
  _id: string;
  idea_id: string;
  content: string;
  developer: string;
}

export default function IdeaApplyList({ ideaId }: { ideaId: string }) {
  const [appliedIdeas, setAppliedIdeas] = useState<AppliedIdea[]>([]);

  useEffect(() => {
    const fetchAppliedIdeas = async () => {
      try {
        const response = await fetch(`/api/applied-idea/${ideaId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applied ideas');
        }
        const data = await response.json();
        setAppliedIdeas(data);
      } catch (error) {
        console.error('Error fetching applied ideas:', error);
      }
    };

    fetchAppliedIdeas();
  }, [ideaId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">아이디어 지원 목록</h1>
      <ul>
        {appliedIdeas.map((appliedIdea) => (
          <li key={appliedIdea._id} className="mb-4">
            <p><strong>지원자:</strong> {appliedIdea.developer}</p>
            <p><strong>내용:</strong> {appliedIdea.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}