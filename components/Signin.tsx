'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function Signin() {
  const [openAIKey, setOpenAIKey] = useState<string>('');

  const handleSetApiKey = () => {
    if (openAIKey) {
      localStorage.setItem("OPENAI", openAIKey)
      signIn(); // If OpenAI key is set, initiate sign-in
    } else {
      alert('Please set the OpenAI API key first.'); // Alert user to set OpenAI key
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black w-screen h-[100vh]">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-8">EMAIL-CLASSIFIER</h1>
        <div className="flex flex-col items-center">
          <button
            onClick={handleSetApiKey}
            className="w-full m-3 bg-lime-500 p-3 border-gray-700 rounded-lg"
          >
            Sign In
          </button>
          <input
            type="text"
            placeholder="Enter Gemini Api Key"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            className="w-full p-3 border border-gray-700 text-center rounded-lg text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
        </div>
      </div>
    </div>
  );
}
