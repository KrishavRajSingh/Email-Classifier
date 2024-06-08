'use client';
import { useState } from "react";

export function OpenAI(){
    const [openAIKey, setOpenAIKey] = useState<string>('');
    return <>
        <input
          type="text"
          placeholder="Enter OpenAI Key"
          value={openAIKey}
          onChange={(e) => setOpenAIKey(e.target.value)}
          className="mt-4 p-2 border rounded text-black"
        />
        <button onClick={() => localStorage.setItem("OPENAI", openAIKey)}>Set Api Key</button>
    </>
}