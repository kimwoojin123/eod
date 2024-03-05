'use client'

import { getUsernameSomehow } from "@/app/ui/getUsername"
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import BackButton from "@/app/ui/Buttons/backButton";
import CustomModal from "@/app/ui/modal";

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
        setMessage('이미 신청한 아이디어입니다.')
        openModal();
      } else {
      setMessage('의뢰를 신청했습니다.')
      openModal();
      }
    } catch (error) {
      console.error('Error requesting idea:', error);
    }
  };

  return (
    <div>
    <div className='absolute left-6 top-20'>
    <BackButton />
    </div>
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
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width="360px" height="180px">
        <p>{message}</p>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
      </CustomModal>
    </div>
    </div>
  );
}