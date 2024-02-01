import { useState, useEffect } from 'react';
import { getUsernameSomehow } from '../getUsername';

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


  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(`/api/show-reply/${ideaId}`);
        const data = await response.json();
        setReplies(data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };
  
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
      } else {
        console.error('Error adding reply:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div>
      {/* 댓글 목록 출력 */}
      <ul>
      {replies && Array.isArray(replies) && replies.map((reply) => (
          <li key={reply._id}>
            <p>{reply.username}: {reply.textContent}</p>
            <p>{reply.addDate}</p>
          </li>
        ))}
      </ul>

      {/* 댓글 작성 폼 */}
      <div>
        <textarea
          value={newReply.textContent}
          onChange={(e) => setNewReply({ ...newReply, textContent: e.target.value })}
        />
        <button onClick={handleAddReply}>Add Reply</button>
      </div>
    </div>
  );
}