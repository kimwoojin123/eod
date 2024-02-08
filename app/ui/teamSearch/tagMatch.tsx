'use client'

import { useState } from 'react';
import Link from 'next/link'

interface Team {
  _id: string;
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
  tag: string;
  teamMember: string[]; 
}

interface Props {
  teams: Team[]; // 팀 목록을 받아올 props
  onCloseModal: () => void; // 모달 닫기 함수를 전달 받음

}



const TagMatch = ({ teams , onCloseModal }: Props) => {
  const [matchingTeams, setMatchingTeams] = useState<Team[]>([]); // 매칭된 팀을 저장할 상태
  const [inputTag, setInputTag] = useState<string>('#'); // 입력창의 기본값
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const handleMatch = () => {
    const matching = teams.filter(team => team && team.tag && inputTag.split(' ').some(tag => team.tag.includes(tag))); 
    setMatchingTeams(matching); // 매칭된 팀들 저장
  };

  const handleDetailClick = (team: Team) => {
    setSelectedTeam(team === selectedTeam ? null : team);
  };


  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (value.includes(',')) { // 콤마가 입력되면
      value = value.replace(',', ' #'); // 콤마를 #으로 대체
      if (!value.startsWith('#')) { // 입력 값이 #로 시작하지 않으면
        value = `#${value}`; // # 추가
      }
    } else if (!value.startsWith('#')) { // 입력 값이 #로 시작하지 않는 경우
      value = `#${value}`; // # 추가
    }
    setInputTag(value); // 처리된 값으로 inputTag 상태 업데이트
  };

  return (
    <div>
      <input
        type="text"
        value={inputTag}
        onChange={(e) => handleInputChange(e)}
        className="border border-gray-300 rounded px-3 py-1 mb-2"
      />
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

export default TagMatch;