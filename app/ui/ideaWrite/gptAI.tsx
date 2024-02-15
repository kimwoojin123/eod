import { useState } from 'react';

export default function GptAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('질문을 입력하세요.');

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
    <div className='ml-10'>
      <h1>AI에게 도움받기:</h1>
      <form onSubmit={handleAskQuestion}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type='submit'>질문하기</button>
      </form>
      <h2>답변:</h2>
      <p className="h-96 w-80 border">{response}</p>
    </div>
  );
}