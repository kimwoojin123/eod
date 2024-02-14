'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
interface IdeaRequest {
  _id: string;
  teamId: string;
  ideaId: string;
  title: string;
  approved: boolean;
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

  
  const handleApprovalToggle = async (id: string, approved: boolean) => {
    try {
      console.log('전송하는 데이터:', { approved: approved }); // 전송하는 데이터 콘솔에 출력
      const response = await fetch(`/api/approve-request/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: !approved }), // 승인 상태를 토글
      });
      if (!response.ok) {
        throw new Error('Failed to update approval status');
      }
      
      const updatedIdeaRequests = ideaRequests.map(ideaRequest =>
        ideaRequest._id === id ? { ...ideaRequest, approved: !approved } : ideaRequest
      );
      setIdeaRequests(updatedIdeaRequests);
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };



  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">요청 아이디어 목록</h1>
      <ul>
        {ideaRequests.map((ideaRequest) => (
          <li key={ideaRequest._id} className="mb-4">
            <p>
              <Link href={`/ideaSearch/${ideaRequest._id}`}><strong>제목:</strong> {ideaRequest.title}</Link>
            </p>
            <button
                onClick={() =>
                  handleApprovalToggle(ideaRequest._id, ideaRequest.approved)
                }
                className={`rounded-md px-4 py-2 ${
                  ideaRequest.approved
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {ideaRequest.approved ? '승인완료' : '승인'}
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}