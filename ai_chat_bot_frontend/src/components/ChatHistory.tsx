"use client";

import { useEffect, useState } from 'react';
import { getChatHistory } from '@/services/chatService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatHistory = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getChatHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load chat history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-1/4 bg-secondary p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <div className="space-y-4">
        {history.map((msg) => (
          <div key={msg.id} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            <p>{msg.text}</p>
            <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
