'use client'

import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useState, useEffect } from 'react';

interface Team {
  _id : string;
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
}

export default function TeamManage() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const username = getUsernameSomehow();
        const response = await fetch(`/api/team-manage/${username}`);
        if (!response.ok) {
          throw new Error('팀 데이터를 불러오는데 문제가 발생했습니다.');
        }
        const teamData = await response.json();
        setTeams(teamData);
      } catch (error) {
        console.error('팀 데이터를 불러오는데 문제가 발생했습니다:', error);
      }
    }

    fetchTeamData();
  }, []);

  return (
    <div>
      <h1>내 팀 관리</h1>
      <ul>
        {teams.map((team) => (
          <li key={team._id} className='flex'>
            <h2>{team.name}</h2>
            <button className='ml-40 mr-20'>지원신청 보기</button>
            <button>팀 정보 수정</button>
          </li>
        ))}
      </ul>
    </div>
  );
}