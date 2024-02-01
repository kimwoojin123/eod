'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/app/ui/Buttons/backButton';
import Delete from '@/app/ui/ideaSearch/delete'
import Modal from 'react-modal'
import { useRouter } from 'next/navigation'
import { getUsernameSomehow } from '@/app/ui/getUsername';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import Reply from '../../ui/ideaSearch/reply'
import { ObjectId } from 'mongodb';


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

  const searchPath = usePathname();
  const router = useRouter();
  const id = searchPath.split('/').pop();
  

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); router.back()}



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from `/api/id-board/${id}`
        const boardResponse = await fetch(`/api/id-board/${id}`);
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
      const response = await fetch(`/api/idea-delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setMessage('삭제가 완료되었습니다.')
        openModal()
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
      const response = await fetch(`/api/idea-like/${id}`, {
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

  
  return (
    <div className="p-4">
      <BackButton />
      <div className="mx-auto p-4 max-w-2xl border">
        <h1 className="text-2xl font-bold mb-4 border-b pb-2">{boardData.title}</h1>
        <p className="text-gray-500 mb-2 border-b pb-2">작성자 : {boardData.username}</p>
        <p className="text-gray-500 mb-4 border-b pb-2">{boardData.addDate}</p>
        {boardData.imageUrl && (
        <Image src={boardData.imageUrl} alt="Image" width={500} height={500} className="mb-4" />
        )}
        <div className='prose' dangerouslySetInnerHTML={{ __html: boardData.textContent }} />
      </div>
      <div className='flex justify-center'>
        <div className='flex justify-center relative left-16 items-center mt-5'>
        <button className='flex flex-col items-center' onClick={handleLike}>
          {liked ? (
          <SolidHeartIcon className="w-6 h-6 text-red-500" />
            ) : (
          <OutlineHeartIcon className="w-6 h-6" />
          )}
          <p>Likes : {likes}</p>
        </button>
        <div className='relative left-40 mt-2'>
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
            contentLabel="삭제 완료 모달"
          >
            <p>{message}</p>
            <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
          </Modal>
          </div>
          </div>
        </div>

      </div>

      <div>
      <div className='flex ml-80 mt-20'>
        댓글 수 : {boardData.replies?.length || 0}
      </div>
        {id && <Reply ideaId={id} />}
        </div>
    </div>
  );
  }