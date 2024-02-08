'use client'

import React, { useState } from 'react';
import { Team } from '../teamSearch/tagMatch';
import Link from 'next/link'

interface StackMatchProps {
  teams: Team[]; 
  onCloseModal: () => void; 
}

const StackMatch: React.FC<StackMatchProps> = ({ teams, onCloseModal }) => {
  const [matchingTeams, setMatchingTeams] = useState<Team[]>([]);
  const [inputStack, setInputStack] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleMatch = () => {
    const matching = teams.filter(team => team && team.lang && team.lang === inputStack);
    setMatchingTeams(matching); // 매칭된 팀들 저장
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputStack(e.target.value);
  };


  const handleDetailClick = (team: Team) => {
    setSelectedTeam(team === selectedTeam ? null : team);
  };


  const handleCloseModal = () => {
    onCloseModal();
  };


  return (
    <div>
      <select id="lang" name="lang" className='w-40 h-10 border rounded' onChange={(e) => handleInputChange(e)}>
        <option>JavaScript</option>
        <option>Python</option>
        <option>C</option>
        <option>C++</option>
        <option>C#</option>
        <option>Java</option>
        <option>Go</option>
      </select>
      <button onClick={handleMatch} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        매칭
      </button>
      <div>
        {matchingTeams.map((team) => (
          <div key={team._id} className="mt-4 p-4 border rounded">
            <Link href={`/teamSearch/${team._id}`}>
              <p className="text-blue-500 font-bold">팀명: {team.name}</p>
            </Link>
            <button
              onClick={() => handleDetailClick(team)}
              className="ml-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            >
              자세히 보기
            </button>
            {selectedTeam === team && (
              <div className="mt-2">
                <p>팀장: {team.username}</p>
                <p>개발 언어: {team.lang}</p>
                <p>팀 목표: {team.purpose}</p>
                <p>모집 인원: {team.headCount}</p>
              </div>
            )}
          </div>
        ))}
      </div>
        <button onClick={handleCloseModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          닫기
      </button>
    </div>
  );
};

export default StackMatch;