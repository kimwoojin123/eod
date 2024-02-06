'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

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
      <Link href="/teamSearch/teamCreate" className='flex justify-end mt-12 mr-40'>
        <p className="flex justify-center items-center w-32 h-10 text-white bg-green-500 rounded-2xl">
          팀 등록하기
        </p>
      </Link>
      <h2 className="text-2xl font-bold mt-4 mb-2 ml-20">팀 목록</h2>
      <div className="grid grid-cols-6 gap-4 pl-20 pr-20 pt-5">
        {teams.map((team) => (
          <div key={team._id} className="border p-4 rounded-md">
            <Image src={team.imageUrl} alt={`${team.name} 이미지`} width={800} height={800} className="w-full h-40 object-contain mb-2 rounded-md" />
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