import { useState } from 'react';

export default function GptAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('No response yet');

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
      <h1>Ask ChatGPT a Question:</h1>
      <form onSubmit={handleAskQuestion}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type='submit'>Ask</button>
      </form>
      <h2>ChatGPT Response:</h2>
      <p className="h-96 w-80 border">{response}</p>
    </div>
  );
}