
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        timestamp: new Date(),
      });
      
      setMessage(response.data.message || 'Click logged successfully!');
    } catch (err) {
      console.error('Error logging click:', err);
      setError('Failed to log click. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Simple Click Logger</h1>
        
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Logging...' : 'Log Click to MongoDB'}
        </button>
        
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
