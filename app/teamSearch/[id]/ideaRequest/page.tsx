'use client'

import { getUsernameSomehow } from "@/app/ui/getUsername"
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Modal from 'react-modal'

interface Idea {
  _id: string;
  title: string;
  addDate: string;
}

export default function IdeaRequest() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [userId, setUserId] = useState('')
  const path = usePathname();
  const teamId = path.split('/')[2]
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()};

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

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const username = getUsernameSomehow();
        const response = await fetch(`/api/get-userId/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user ideas');
        }
        const data = await response.json();
        setUserId(data)
      } catch (error) {
        console.error('Error fetching user ideas:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSelectIdea = (id: string) => {
    if (selectedIdea === id) {
      setSelectedIdea(null); 
    } else {
      setSelectedIdea(id);
    }
  };

  const handleRequest = async () => {
    if (!selectedIdea) {
      console.error('No idea selected');
      return;
    }
    try {
      const ideaId = selectedIdea
      const response = await fetch(`/api/idea-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          ideaId,
          userId,
          teamId
        })
      });
      if (!response.ok) {
        throw new Error('Failed to request idea');
      }
      setMessage('의뢰를 신청했습니다.')
      openModal();
    } catch (error) {
      console.error('Error requesting idea:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {ideas.map((idea) => (
        <div className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg" key={idea._id}>
          <div>
            <input
              type="checkbox"
              checked={selectedIdea === idea._id}
              onChange={() => handleSelectIdea(idea._id)}
              className="mr-2"
            />
            <span>{idea.title}</span>
          </div>
          <span>{idea.addDate}</span>
        </div>
      ))}
      <button onClick={handleRequest} disabled={!selectedIdea} className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed">
        의뢰하기
      </button>
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
        contentLabel="아이디어 의뢰 모달"
      >
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}