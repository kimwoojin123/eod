'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlusIcon } from '@heroicons/react/24/solid';

interface Team {
  _id: string;
  name: string;
  applicants: number;
}

export default function PopularTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPopularTeams = async () => {
      try {
        const response = await fetch('/api/get-teamApply', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch popular teams');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching popular teams:', error);
      }
    };

    fetchPopularTeams();
  }, []);

  const handleTeamClick = (teamId: string) => {
    router.push(`/teamSearch/${teamId}`);
  };

  return (
    <div className='w-1/5 mt-10'>
      <h1 className="text-xl font-bold mb-4">지원자 많은 팀</h1>
      <div className='border border-gray-300 p-4' style={{ height: '580px' }}>
        {teams.map((team, index) => (
          <div key={team._id} className="py-2 cursor-pointer" onClick={() => handleTeamClick(team._id)}>
            <p className="hover:underline flex">{`${index + 1}. ${team.name}`}<UserPlusIcon className='w-5 h-5 ml-2 mt-0.5'/> {team.applicants}</p>
          </div>
        ))}
      </div>
    </div>
  );
}