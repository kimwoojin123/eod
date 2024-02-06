'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Team {
  _id: string;
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
}

export default function TeamSearch(){
  const [teams, setTeams] = useState<Team[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/team-list');
        const teamData = await response.json();
        setTeams(teamData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link href="/teamSearch/teamApply">
        <p className="flex justify-center items-center w-32 h-10 text-white bg-green-500 rounded-2xl">
          팀 등록하기
        </p>
      </Link>
      <h2 className="text-2xl font-bold mt-4 mb-2">팀 목록</h2>

      <div className="grid grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team._id} className="border p-4 rounded-md">
            <img src={team.imageUrl} alt={`${team.name} 이미지`} className="w-full h-40 object-cover mb-2 rounded-md" />
            <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
            <p className="text-gray-500 mb-2">팀장: {team.username}</p>
            <p className="text-gray-500 mb-2">개발 언어: {team.lang}</p>
            <p className="text-gray-500 mb-2">팀 목표: {team.purpose}</p>
            <p className="text-gray-500 mb-2">모집 인원: {team.headCount}</p>
            <Link href={`/teamSearch/${team._id}`}>
              <p className="text-blue-500">자세히 보기</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}