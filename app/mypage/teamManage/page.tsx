'use client'

import { getUsernameSomehow } from '@/app/ui/getUsername';
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import RequestIdeaList from '@/app/ui/mypage/requestIdeaList';
import TeamEdit from '@/app/ui/mypage/teamEdit';

interface Team {
  _id: string;
  username: string;
  name: string;
  lang: string;
  purpose: string;
  headCount: string;
  imageUrl: string;
  approved: boolean; 
}

interface Applicant {
  _id: string;
  name : string;
  username: string;
  email : string;
  phoneNumber:string;
  stack: string;
  content: string;
  team_id: string;
  user_info:UserInfo;
  approved:boolean;
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
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [approvalModalIsOpen, setApprovalModalIsOpen] = useState<boolean>(false); 
  const [approvalClicked, setApprovalClicked] = useState<boolean>(false); // 승인 버튼 클릭 상태
  const [ideaRequestModalIsOpen, setIdeaRequestModalIsOpen] = useState<boolean>(false); // 추가
  const [teamEditModalIsOpen, setTeamEditModalIsOpen] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(''); // 추가

  
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

  

  const approve = async (applicantId: string, teamId: string) => {
    try {
      const response = await fetch(`/api/approve-applicant/${applicantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({team_id : teamId})
      });
  
      if (!response.ok) {
        throw new Error('지원자 승인에 실패했습니다.');
      }
      setApprovalModalIsOpen(true);
      setApprovalClicked(true);

    } catch (error) {
      console.error('지원자 승인 중 오류 발생:', error);
    }
  }

  const handleDetailClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant === selectedApplicant ? null : applicant);
  };


  useEffect(() => {
    const fetchApprovalStatus = async () => {
      try {
        if (!selectedApplicant) return; // 선택된 지원자가 없으면 함수 종료
  
        const response = await fetch(`/api/get-approve`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ team_id: selectedApplicant.team_id }), 
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch approval status');
        }
  
        const data = await response.json();
        const approvedState = data.approved; 
  
        setSelectedApplicant(prevApplicant => ({
          ...prevApplicant!,
          approved: approvedState
        }));
      } catch (error) {
        console.error('Failed to fetch approval status:', error);
      }
    };
  
    fetchApprovalStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const openIdeaRequestModal = (teamId: string) => { // 추가
    setSelectedTeamId(teamId);
    setIdeaRequestModalIsOpen(true);
  };

  const openTeamEditModal = (teamId: string) => {
    setSelectedTeamId(teamId);
    setTeamEditModalIsOpen(true);
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-4">내 팀 관리</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                팀 이름
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지원신청 보기
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                요청 아이디어
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                팀 정보 수정
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teams.map((team) => (
              <tr key={team._id}>
                <td className="px-6 py-4 whitespace-nowrap">{team.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="py-2 px-4 rounded-lg bg-blue-500 text-white" onClick={() => openModal(team._id)}>
                    지원신청 보기
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="py-2 px-4 rounded-lg bg-blue-500 text-white" onClick={() => openIdeaRequestModal(team._id)}>요청 아이디어</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="py-2 px-4 rounded-lg bg-blue-500 text-white" onClick={() => openTeamEditModal(team._id)}>팀 정보 수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
          },
          content: {
            display:"flex",
            flexDirection : "column",
            alignItems : 'center',
            width: "720px",
            height: "600px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            whiteSpace: 'pre-line',
          },
        }}
        contentLabel="지원자 정보 모달"
      >
          <div className="modal">
          <div className="modal-content">
            <h2>지원자 정보</h2>
            <ul>
            {applicants.map((applicant) => (
              <li key={applicant._id}>
                <div className="flex justify-between items-center w-full mb-4">
                  <p>유저명 : {applicant.username}</p>
                  <button className="w-32 h-8 rounded-2xl bg-gray-200 ml-5" onClick={() => handleDetailClick(applicant)}>자세히 보기</button>
                </div>
                {selectedApplicant === applicant && (
                  <div className="flex flex-col mt-3 mb-4">
                    <p>이름 : {applicant.name}</p>
                    <p>이메일 : {applicant.email}</p>
                    <p>전화번호 : {applicant.phoneNumber}</p>
                    <p>스택: {applicant.stack}</p>
                    <p>지원내용: {applicant.content}</p>
                    {applicant.approved ? (
                    <div className="flex justify-center items-center ml-16 w-40 h-10 rounded-2xl bg-gray-200 mt-5">승인완료</div>
                     ) : (
                      <button className="ml-16 w-40 h-10 rounded-2xl bg-green-200 mt-5" onClick={() => approve(applicant._id, applicant.team_id)}>승인</button>
                    )}
                  </div>
                )}
              </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
      <Modal
        isOpen={approvalModalIsOpen}
        onRequestClose={() => setApprovalModalIsOpen(false)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
          },
          content: {
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            width: "420px",
            height: "200px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            justifyContent: "center",
            overflow: "auto",
            whiteSpace: 'pre-line',
          },
        }}
        contentLabel="승인 완료 모달"
      >
        <div className="modal">
          <div className="modal-content">
            <h2>승인이 완료되었습니다!</h2>
            <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={() => setApprovalModalIsOpen(false)}>확인</button>
          </div>
        </div>
      </Modal>
      <Modal
      isOpen={ideaRequestModalIsOpen}
      onRequestClose={() => setIdeaRequestModalIsOpen(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: " rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100vh",
          zIndex: "10",
          position: "fixed",
          top: "0",
          left: "0",
        },
        content: {
          display:"flex",
          flexDirection : "column",
          alignItems : 'center',
          width: "720px",
          height: "600px",
          zIndex: "150",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          justifyContent: "center",
          overflow: "auto",
          whiteSpace: 'pre-line',
        },
      }}
      contentLabel="요청 아이디어 목록 모달"
    >
      <RequestIdeaList teamId={selectedTeamId} /> 
      <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={() => setIdeaRequestModalIsOpen(false)}>닫기</button>
    </Modal>
    <Modal
      isOpen={teamEditModalIsOpen}
      onRequestClose={() => setTeamEditModalIsOpen(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: " rgba(0, 0, 0, 0.4)",
          width: "100%",
          height: "100vh",
          zIndex: "10",
          position: "fixed",
          top: "0",
          left: "0",
        },
        content: {
          display:"flex",
          flexDirection : "column",
          alignItems : 'center',
          width: "720px",
          height: "800px",
          zIndex: "150",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          justifyContent: "center",
          overflow: "auto",
          whiteSpace: 'pre-line',
        },
      }}
      contentLabel="팀 정보 수정 모달"
    >
      <TeamEdit teamId={selectedTeamId} />
      <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={() => setTeamEditModalIsOpen(false)}>닫기</button>
    </Modal>
    </div>
  );
}