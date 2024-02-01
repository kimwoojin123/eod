import { useState, useEffect } from 'react';
import { getUsernameSomehow } from '../getUsername';
import Modal from 'react-modal'


interface ReplyProps {
  _id: string;
  ideaId: string;
  username: string;
  textContent: string;
  addDate: string;
}

export default function Reply({ ideaId }: { ideaId: string }) {
  const [replies, setReplies] = useState<ReplyProps[] | undefined>(undefined);
  const [newReply, setNewReply] = useState({
    ideaId: '',
    username: '',
    textContent: '',
  });
  const [message, setMessage] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {setModalIsOpen(false); fetchReplies()}

  const fetchReplies = async () => {
    try {
      const response = await fetch(`/api/show-reply/${ideaId}`);
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
      if (ideaId) {
      fetchReplies();
    }
  }, [ideaId]);

  const handleAddReply = async () => {
    try {
      const username = getUsernameSomehow();
      const response = await fetch(`/api/idea-reply/${ideaId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...newReply, username, textContent : newReply.textContent}),
      });

      if (response.ok) {
        setNewReply({ ...newReply, textContent: '' });
        setMessage('댓글이 등록되었습니다.')
        openModal()
      } else {
        console.error('Error adding reply:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className='w-screen flex justify-center'>
      <div className='mt-20 w-8/12'>
        <table className='w-full'>
          <thead>
            <tr className='border'>
              <th className='border-r text-center'>닉네임</th>
              <th className='flex-grow border-r max-w-5xl text-center'>내용</th>
              <th className='text-center'>시간</th>
            </tr>
          </thead>
          <tbody>
            {replies && Array.isArray(replies) && replies.map((reply) => (
              <tr key={reply._id} className='border'>
                <td className='pl-2 pr-2 border-r text-center'>{reply.username}</td>
                <td className='flex-grow border-r max-w-5xl pl-3'>{reply.textContent}</td>
                <td className='text-center pl-2 '>{reply.addDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-2'>
          <textarea
            value={newReply.textContent}
            onChange={(e) => setNewReply({ ...newReply, textContent: e.target.value })}
            className='border-gray-500 border w-96 h-8'
          />
          <button onClick={handleAddReply} className='border ml-2'>등록</button>
        </div>
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
            contentLabel="댓글 등록 모달"
          >
            <p>{message}</p>
            <button className="w-40 h-10 rounded-2xl bg-gray-200 mt-5" onClick={closeModal}>닫기</button>
          </Modal>
    </div>
  );
            }