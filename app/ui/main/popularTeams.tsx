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
        const response = await fetch('/api/team/get-teamApply', { cache: 'no-store' });
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
    <div className='w-3/12 mt-10'>
      <h1 className="text-xl text-white mb-4">Popular Teams</h1>
      <div className='flex flex-col mix-blend-screen bg-white/10 rounded-3xl' style={{ height: '580px' }}>
        {teams.map((team, index) => (
          <div key={team._id} className="flex flex-col mt-2 pl-4 pr-4 h-14 justify-center cursor-pointer hover:bg-black" onClick={() => handleTeamClick(team._id)}>
            <p className="hover:underline flex text-white text-sm">{`${index + 1}. ${team.name}`}<UserPlusIcon className='w-5 h-5 ml-2'/> {team.applicants}</p>
          </div>
        ))}
      </div>
    </div>
  );
}