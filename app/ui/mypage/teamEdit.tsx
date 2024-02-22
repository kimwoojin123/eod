'use client'

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal'

interface TeamInfo {
  username:string;
  name: string;
  lang: string;
  purpose: string;
  headCount: number;
  tag:string;
}

interface FormData {
  name: string;
  lang: string;
  purpose: string;
  headCount: number;
  tag:string;
}


export default function TeamEdit({ teamId }: { teamId: string }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (teamId) {
      fetchTeamInfo(teamId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const fetchTeamInfo = async (id: string) => {
    try {
      const response = await fetch(`/api/team-detail/${id}`);
      if (!response.ok) {
        throw new Error('팀 정보를 불러오는 데 실패했습니다.');
      }
      const data = await response.json();
      setTeamInfo(data);
      // 폼 필드 값 설정
      setValue('name', data.name);
      setValue('lang', data.lang);
      setValue('purpose', data.purpose);
      setValue('headCount', data.headCount);
      setValue('tag', data.tag);
    } catch (error) {
      console.error('팀 정보를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/team-edit/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('팀 정보를 업데이트하는 데 실패했습니다.');
      }
      // 업데이트 후 팀 정보 새로고침
      fetchTeamInfo(teamId);
      setMessage('팀 정보 수정이 완료되었습니다.')
      openModal();
    } catch (error) {
      console.error('팀 정보를 업데이트하는 중 오류가 발생했습니다:', error);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    // 쉼표로 구분된 단어들을 분리하여 각 단어의 앞에 #을 추가
    value = value
      .split(/\s*,\s*/) // 쉼표로 구분된 단어들을 분리
      .map(word => (word.startsWith('#') ? word : `#${word}`)) // 각 단어에 #을 추가
      .join(' '); // 다시 쉼표로 구분하여 합침
      setValue('tag', value);
  };


  if (!teamInfo) {
    return <div>로딩 중...</div>;
  }



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">팀 정보 수정</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="mb-4">
            <label className="block">팀장</label>
            <input type="text" value={teamInfo.username} readOnly className="rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="block">이름</label>
            <input type="text" {...register('name')} className="rounded-lg border-gray-300 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block">언어</label>
          <select {...register('lang')} className="rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2">
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="Java">Java</option>
            <option value="Go">Go</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block">목적</label>
          <input type="text" {...register('purpose')} className="rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">인원 수</label>
          <input type="number" {...register('headCount')} className="rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block">태그</label>
          <input type="text" {...register('tag')} className="rounded-lg border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full px-3 py-2" onChange={handleTagChange} />
        </div>
        <button type="submit" className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">수정하기</button>
      </form>
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
            width: "360px",
            height: "180px",
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
        contentLabel="팀 수정완료 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}