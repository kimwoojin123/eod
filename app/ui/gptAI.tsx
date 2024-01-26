import { useState } from 'react';

export default function GptAI() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('No response yet');

  const handleAskQuestion = async () => {
    try {
      const apiResponse = await fetch('/gptSetting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const { response } = await apiResponse.json();
      setResponse(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Ask ChatGPT a Question:</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAskQuestion}>Ask</button>

      <h2>ChatGPT Response:</h2>
      <p>{response}</p>
    </div>
  );
}