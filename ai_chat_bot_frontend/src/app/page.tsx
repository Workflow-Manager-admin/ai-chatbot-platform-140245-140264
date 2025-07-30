"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Chat from '@/components/Chat';
import ChatHistory from '@/components/ChatHistory';
import LoginPage from './login/page';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <LoginPage/>
  }

  return (
    <div className="flex w-full h-full bg-gray-50">
      <ChatHistory />
      <Chat />
    </div>
  );
}
