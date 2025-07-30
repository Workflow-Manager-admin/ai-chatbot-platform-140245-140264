import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const sendMessage = async (message: string) => {
  const response = await axios.post(`${API_URL}/chat`, { message });
  return response.data;
};

export const getChatHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};
