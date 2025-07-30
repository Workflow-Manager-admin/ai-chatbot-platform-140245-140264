"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/Button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-secondary py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        AI ChatBot
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.username}</span>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
