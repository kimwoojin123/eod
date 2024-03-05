'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TagMatch from '../ui/teamSearch/tagMatch';
import StackMatch from '../ui/teamSearch/stackMatch';
import BackButton from '../ui/Buttons/backButton';
import CustomModal from '../ui/modal';

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

const TeamsPerPage = 3;
const DisplayedPages = 5;

export default function TeamSearch() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalSize, setModalSize] = useState<{ width: string; height: string }>({ width: '400px', height: '320px' });
  const [currentPage, setCurrentPage] = useState(1);

  const openMatchingModal = () => {
    setModalIsOpen(true);
    setModalContent(
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg w-80 h-60 justify-center flex flex-col">
          <div className="flex flex-col justify-around">
            <button onClick={handleTagMatchingButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-10">
              태그로 매칭
            </button>
            <button onClick={handleStackMatchButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded-md">
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
    );
  };

  const closeMatchingModal = () => {
    setModalSize({ width: '400px', height: '320px' })
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/team/team-list', { cache: 'no-store' });
        const teamData = await response.json();
        setTeams(teamData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTagMatchingButtonClick = () => {
    setModalContent(<TagMatch teams={teams} onCloseModal={closeMatchingModal} />);
    setModalSize({ width: '600px', height: '720px' });
    setModalIsOpen(true);
  };

  const handleStackMatchButtonClick = () => {
    setModalContent(<StackMatch teams={teams} onCloseModal={closeMatchingModal} />);
    setModalSize({ width: '600px', height: '720px' });
    setModalIsOpen(true);
  }

  const totalPages = Math.ceil(teams.length / TeamsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(DisplayedPages / 2));
    const endPage = Math.min(totalPages, startPage + DisplayedPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-4">
        <button
          className="mx-1 px-3 py-1 border rounded"
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {pages}
        <button
          className="mx-1 px-3 py-1 border rounded"
          onClick={() => setCurrentPage(nextPage => Math.min(nextPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    );
  };

  const indexOfLastTeam = currentPage * TeamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - TeamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  return (
    <div>
      <div className='absolute left-6 top-20'>
        <BackButton />
      </div>
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
        {currentTeams.map((team) => (
          <div key={team._id} className="border p-4 rounded-md">
            {team.imageUrl && (
              <Image
                src={team.imageUrl}
                alt={`${team.name} 이미지`}
                width={800}
                height={800}
                className="w-full h-40 object-contain mb-2 rounded-md"
              />
            )}
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
      {renderPagination()}
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeMatchingModal} width={`${modalSize.width}`} height={`${modalSize.height}`}>
        {modalContent}
      </CustomModal>
    </div>
  );
}