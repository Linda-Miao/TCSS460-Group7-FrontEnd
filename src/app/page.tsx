'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      if (token) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
      
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-purple-400 mb-4">PIBBLE</h1>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
