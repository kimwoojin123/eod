import { useState } from 'react';

export default function GptAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('도움을 드릴게요.');

  const handleAskQuestion = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('question', question);
      const apiResponse = await fetch('/api/gptSetting', {
        method: 'POST',
        body: formData,
      });
  
      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.error('Server responded with:', errorData);
        throw new Error('Server error');
      }
  
      const { result } = await apiResponse.json();
      setResponse( result );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div>
      <p className='text-white'>AI에게 도움받기:</p>
      <form onSubmit={handleAskQuestion}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className='border'
        placeholder='질문을 입력하세요'
      />
      <button className='bg-gray-200 ml-4 h-8 w-20 rounded-2xl' type='submit'>질문하기</button>
      </form>
      <p className='text-white'>답변:</p>
      <p className="w-80 border text-white p-4">{response}</p>
    </div>
  );
}