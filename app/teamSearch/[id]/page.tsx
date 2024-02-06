'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image'

interface Team {
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
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

  return (
    <div>
      <h1>{team.name}</h1>
      <Image src={team.imageUrl} alt={`${team.name} 이미지`} width={500} height={500}  />
      <p>팀장: {team.username}</p>
      <p>팀 목표: {team.purpose}</p>
      <p>개발 언어: {team.lang}</p>
      <p>모집 인원: {team.headCount}</p>
      <button>팀 지원하기</button>
    </div>
  );
}