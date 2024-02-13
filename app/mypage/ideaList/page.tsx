'use client'

import { useEffect, useState } from 'react';
import { getUsernameSomehow } from '@/app/ui/getUsername';
import Modal from 'react-modal';
import IdeaApplyList from '@/app/ui/mypage/ideaApplyList';

interface Idea {
  _id: string;
  title: string;
  addDate:string;
}

export default function IdeaList() {
  const [ideas, setIdeas] = useState<Idea[]>([]); // 아이디어 목록 상태
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null); // 선택된 아이디어 상태

  // 아이디어 목록 가져오는 함수
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const username = getUsernameSomehow();
        const response = await fetch(`/api/user-ideas/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user ideas');
        }
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error('Error fetching user ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  const openModal = (idea : Idea) => {
    setSelectedIdea(idea);
  };

  const closeModal = () => {
    setSelectedIdea(null);
  };

  return (
  <div className="container p-4">
    <h1 className="text-2xl font-bold mb-4">내가 작성한 아이디어 목록</h1>
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <li key={idea._id} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">{idea.title}</h2>
          <p className="text-gray-500 text-sm">작성일: {idea.addDate}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => openModal(idea)}>개발지원목록</button>
        </li>
      ))}
    </ul>

      <Modal
        isOpen={!!selectedIdea}
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
            width: "600px",
            height: "720px",
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
        contentLabel="아이디어 목록 모달"
      >
        {selectedIdea && <IdeaApplyList ideaId={selectedIdea._id} />}
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}