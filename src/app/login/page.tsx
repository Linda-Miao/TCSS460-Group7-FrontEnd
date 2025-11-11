'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://tcss460-group7-credential-api.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      
      if (result.data && result.data.accessToken) {
        localStorage.setItem('token', result.data.accessToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        router.push('/dashboard');
      } else {
        throw new Error('No access token received');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold text-purple-600">PIBBLE</h1>
        </div>
        <div className="space-y-6">
          {error && <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
              <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
              <input id="password" type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded">{loading ? 'Logging in...' : 'Login'}</button>
            <div className="text-center"><p className="text-white mb-4">Don't have account?</p><Link href="/register" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded">Sign Up</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}
