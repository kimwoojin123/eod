'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUsernameSomehow } from '../getUsername';

export default function TeamIdeaApplyForm() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const username = getUsernameSomehow(); 
        const response = await fetch(`/api/team-manage/${username}`);
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setMessage('팀 데이터를 불러오는 중에 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/team-idea-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: getUsernameSomehow(), 
          teamId: selectedTeam,
          content,
        }),
      });

      if (response.ok) {
        setMessage('아이디어 지원이 성공적으로 제출되었습니다.');
      } else {
        setMessage('아이디어 지원 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error submitting idea support:', error);
      setMessage('아이디어 지원 제출에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">아이디어 지원하기</h1>
      <label htmlFor="team">팀 선택:</label>
      <select
        id="team"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="mb-4"
      >
        <option value="">팀을 선택하세요</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
      <label htmlFor="content">내용:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="mb-4 w-full"
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        제출하기
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}