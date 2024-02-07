'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Modal from 'react-modal'

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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openMatchingModal = () => {
    setModalIsOpen(true);
  };

  const closeMatchingModal = () => {
    setModalIsOpen(false);
  };

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
      <div className='flex justify-end'>
      <div className='mt-12 mr-6'>
        <p onClick={openMatchingModal} className="flex justify-center items-center w-32 h-10 text-white bg-blue-500 rounded-2xl cursor-pointer">
            팀 매칭하기
        </p>
      </div>
      <Link href="/teamSearch/teamCreate" className='mt-12 mr-20'>
        <p className="flex justify-center items-center w-32 h-10 text-white bg-green-500 rounded-2xl">
          팀 등록하기
        </p>
      </Link>
      </div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeMatchingModal}
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
            width: "400px",
            height: "340px",
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
        contentLabel="매칭 모달"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg w-80 h-60 justify-center flex flex-col">
            <div className="flex flex-col justify-around">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md mb-10">
                태그로 매칭
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                스택으로 매칭
              </button>
            </div>
            <button className="absolute top-4 right-4" onClick={closeMatchingModal}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}