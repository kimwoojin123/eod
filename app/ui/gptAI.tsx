import React, { useState } from 'react';
import { gptSetting } from './gptSetting';

export default function GptAI() {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('No response yet');

  const handleAskQuestion = async () => {
    try {
      const result = await gptSetting(question);
      setResponse(result);
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