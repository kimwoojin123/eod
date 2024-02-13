'use client'

import { useState, useEffect } from 'react';

interface IdeaRequest {
  _id: string;
  teamId: string;
  ideaId: string;
  title: string;
}

export default function RequestIdeaList({ teamId }: { teamId: string }) {
  const [ideaRequests, setIdeaRequests] = useState<IdeaRequest[]>([]);

  useEffect(() => {
    async function fetchIdeaRequests() {
      try {
        const response = await fetch(`/api/request-list/${teamId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch idea requests');
        }
        const data = await response.json();
        setIdeaRequests(data);
      } catch (error) {
        console.error('Error fetching idea requests:', error);
      }
    }

    fetchIdeaRequests();
  }, [teamId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">요청 아이디어 목록</h1>
      <ul>
        {ideaRequests.map((ideaRequest) => (
          <li key={ideaRequest._id} className="mb-4">
            <p>
              <strong>제목:</strong> {ideaRequest.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}