'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/app/ui/Buttons/backButton';
import Delete from '@/app/ui/ideaSearch/delete'
import { useRouter } from 'next/navigation'
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import Reply from '../../ui/ideaSearch/reply'
import { ObjectId } from 'mongodb';
import TeamIdeaApplyForm from '@/app/ui/ideaSearch/teamIdeaApply';
import IndividualIdeaApplyForm from '@/app/ui/ideaSearch/individualIdeaApply';
import CustomModal from '@/app/ui/modal';

interface DetailPageProps {
  username: string;
  title: string;
  addDate: string;
  imageUrl: string;
  textContent: string;
  replies : ObjectId[]
}

export default function DetailPage() {
  const [boardData, setBoardData] = useState<DetailPageProps | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [applyAsTeam, setApplyAsTeam] = useState(false);
  const [applyAsIndividual, setApplyAsIndividual] = useState(false);

  const searchPath = usePathname();
  const router = useRouter();
  const id = searchPath.split('/').pop();
  

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()}
  const modalClose = () => {setModalIsOpen(false)}
  const deleteModal = () => {setShowDeleteModal(true); router.back()}

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from `/api/id-board/${id}`
        const boardResponse = await fetch(`/api/idea/id-board/${id}`);
        const boardData = await boardResponse.json();
        setBoardData(boardData);
        setLikes(boardData.likes)
        setLiked(boardData.likedBy ? boardData.likedBy.includes(getUsernameSomehow()) : false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id]);


  if (!boardData) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/idea/idea-delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setMessage('삭제가 완료되었습니다.')
        deleteModal()
      } else {
        setMessage('삭제에 실패했습니다.')
        openModal()
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    router.push(`/ideaSearch/${id}/edit`);
  };


  
  const handleLike = async () => {
    try {
      const username = getUsernameSomehow();
      const response = await fetch(`/api/idea/idea-like/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (response.ok) {
        const updatedIdea = await response.json();
        setBoardData((prevData) => prevData ? { ...prevData, likes: updatedIdea.likes, likedBy: updatedIdea.likedBy } : prevData);
        setLiked((prevLiked) => !prevLiked);
        setLikes(updatedIdea.likes);
      } else {
        console.error('Error liking idea:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking idea:', error);
    }
  };

  const handleTeamApply = () => {
    setApplyAsTeam(false);
    setApplyAsIndividual(false);
    openModal();
  };




  return (
    <div className="p-4 w-full h-screen">
      <BackButton />
      <div className='flex pl-96'>
      <div className="p-4 w-1/2 border">
        <h1 className=" text-white text-2xl font-bold mb-4 border-b pb-2">{boardData.title}</h1>
        <p className=" mb-2 border-b pb-2 text-white">작성자 : {boardData.username}</p>
        <p className=" text-white mb-4 border-b pb-2">{boardData.addDate}</p>
        {boardData.imageUrl && (
        <Image src={boardData.imageUrl} alt="Image" width={500} height={500} className="mb-4" />
        )}
        <div className='prose text-white' dangerouslySetInnerHTML={{ __html: boardData.textContent }} />
      </div>
      <button
        className="rounded-3xl ml-10 h-20 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        onClick={handleTeamApply}>
          개발 착수 지원
          </button>
      </div>
      <div className='flex'>
        <div className='flex items-center mt-5 w-full justify-center'>
          <button className='flex flex-col items-center mr-80' onClick={handleLike}>
            {liked ? (
              <SolidHeartIcon className="w-6 h-6 text-red-500" />
              ) : (
                <OutlineHeartIcon className="w-6 h-6 text-white" />
                )}
            <p className='text-white'>Likes : {likes}</p>
          </button>
        <div className='w-48 flex justify-between'>
          {boardData.username === getUsernameSomehow() && (
            <>
          <button onClick={handleEdit} className="w-20 h-10 rounded-2xl bg-blue-500 text-white">편집</button>
          <button onClick={() => setShowDeleteModal(true)} className="w-20 h-10 rounded-2xl bg-blue-500 text-white">
              삭제
          </button>
            {showDeleteModal && (
              <Delete onDelete={handleDelete} onClose={handleCloseDeleteModal} />
              )}
            </>
            )}
          <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='360px' height='180px'>
            <p>{message}</p>
            <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
          </CustomModal>
          </div>
        </div>
      </div>
      <div>
      <div className='flex text-white ml-32'>
        댓글 수 : {boardData.replies?.length || 0}
      </div>
      <div className='ml-32'>
      {id && <Reply ideaId={id} />}
      </div>
      </div>
    <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} width='600px' height='720px'>
      {applyAsTeam ? (
        <>
        <TeamIdeaApplyForm />
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={() => setApplyAsTeam(false)}>취소</button>
        </>
        ) : applyAsIndividual ? (
          <>
        <IndividualIdeaApplyForm />
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={() => setApplyAsIndividual(false)}>취소</button>
        </>
        ) : (
          <>
        <button className="w-40 h-10 rounded-2xl bg-blue-500 text-white mt-3" onClick={() => setApplyAsTeam(true)}>팀으로 지원</button>
        <button className="w-40 h-10 rounded-2xl bg-blue-500 text-white mt-3" onClick={() => setApplyAsIndividual(true)}>개인으로 지원</button>
        <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-3" onClick={modalClose}>닫기</button>
        </>
      )}
    </CustomModal>
    </div>
  );
  }