"use client";

import { useState } from 'react';
import { sendMessage } from '@/services/chatService';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const aiResponse = await sendMessage(input);
      const aiMessage: Message = { text: aiResponse.reply, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { text: 'Error: Could not get a response.', sender: 'ai' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-3 rounded-lg max-w-lg ${
            msg.sender === 'user' ? 'bg-primary text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'
          }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
