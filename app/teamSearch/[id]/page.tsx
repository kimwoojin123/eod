'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

interface Team {
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
  teamMember: string[]; 

}

export default function TeamDetail() {
  const idPath = usePathname();
  const id = idPath.split('/').pop();

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`/api/team-detail/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeam(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    if (id) {
      fetchTeam();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  const remainingMembers = parseInt(team.headCount) - (team.teamMember ? team.teamMember.length : 0);





  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <div className="w-64 h-64 mb-4">
        <Image src={team.imageUrl} alt={`${team.name} 이미지`} width={500} height={500} />
      </div>
      <p className="mb-2">팀장: {team.username}</p>
      <p className="mb-2">팀 목표: {team.purpose}</p>
      <p className="mb-2">개발 언어: {team.lang}</p>
      <p className="mb-2">모집 인원: {team.headCount}명</p>
      <p className="mb-2">남은 인원: {remainingMembers}명</p>
      <Link href={`/teamSearch/${id}/ideaRequest`} className="text-blue-500">팀 지원하기</Link>
      <Link href={`/teamSearch/${id}/teamApply`} className="text-blue-500">팀 지원하기</Link>
    </div>
  );
}