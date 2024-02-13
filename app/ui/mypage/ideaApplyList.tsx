'use client'

import { useEffect, useState } from 'react';

interface AppliedIdea {
  _id: string;
  idea_id: string;
  content: string;
  developer: string;
  approved: boolean; // 추가: 승인 여부를 나타내는 필드
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

  const handleApprovalToggle = async (id: string, approved: boolean) => {
    try {
      console.log('전송하는 데이터:', { approved: approved }); // 전송하는 데이터 콘솔에 출력
      const response = await fetch(`/api/approve-idea/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: !approved }), // 승인 상태를 토글
      });
      if (!response.ok) {
        throw new Error('Failed to update approval status');
      }
      const updatedAppliedIdeas = appliedIdeas.map((idea) =>
        idea._id === id ? { ...idea, approved: !approved } : idea
      );
      setAppliedIdeas(updatedAppliedIdeas);
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">아이디어 지원 목록</h1>
      <ul>
        {appliedIdeas.map((appliedIdea) => (
          <li key={appliedIdea._id} className="mb-4">
            <p>
              <strong>지원자:</strong> {appliedIdea.developer}
            </p>
            <p>
              <strong>내용:</strong> {appliedIdea.content}
            </p>
            <button
              onClick={() =>
                handleApprovalToggle(appliedIdea._id, appliedIdea.approved)
              }
              className={`rounded-md px-4 py-2 ${
                appliedIdea.approved
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {appliedIdea.approved ? '승인완료' : '승인'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}