'use client'

import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useState, useEffect } from 'react';

interface Team {
  _id: string;
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
}

interface Applicant {
  _id: string;
  name : string;
  username: string;
  email : string;
  phoneNumber:string;
  stack: string;
  content: string;
  user_info:UserInfo;
}

interface UserInfo{
  name : string;
  username: string;
  email : string;
  phoneNumber:string;
}
export default function TeamManage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

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

  const openModal = async (teamId: string) => {
    try {
      const response = await fetch(`/api/inquire-apply/${teamId}`);
      if (!response.ok) {
        throw new Error('지원자 정보를 불러오는데 문제가 발생했습니다.');
      }
      const applicantData = await response.json();
      setApplicants(applicantData.applicants.map((applicant : Applicant ) => ({
        ...applicant,
        ...applicant.user_info
      })));
      setModalIsOpen(true);
    } catch (error) {
      console.error('지원자 정보를 불러오는데 문제가 발생했습니다:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setApplicants([]);
  };

  return (
    <div>
      <h1>내 팀 관리</h1>
      <ul>
        {teams.map((team) => (
          <li key={team._id} className='flex'>
            <h2>{team.name}</h2>
            <button className='ml-40 mr-20' onClick={() => openModal(team._id)}>지원신청 보기</button>
            <button>팀 정보 수정</button>
          </li>
        ))}
      </ul>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>지원자 정보</h2>
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant._id}>
                  <p>이름 : {applicant.name}</p>
                  <p>유저명 : {applicant.username}</p>
                  <p>이메일 : {applicant.email}</p>
                  <p>전화번호 : {applicant.phoneNumber}</p>
                  <p>스택: {applicant.stack}</p>
                  <p>지원내용: {applicant.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}