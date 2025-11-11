'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phone: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://tcss460-group7-credential-api.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || {}));
      }
      
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-black rounded-lg p-8">
          <div className="flex border-b border-gray-700 mb-8">
            <Link href="/login" className="flex-1 text-center py-3 font-medium text-gray-400 hover:text-white">Login</Link>
            <button type="button" className="flex-1 text-center py-3 font-medium text-white border-b-2 border-purple-600">Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded">{error}</div>
            )}

            <div>
              <label htmlFor="firstname" className="block text-white font-medium mb-2">First Name</label>
              <input id="firstname" type="text" required minLength={1} maxLength={100} value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-white font-medium mb-2">Last Name</label>
              <input id="lastname" type="text" required minLength={1} maxLength={100} value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
              <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>

            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">Username</label>
              <input id="username" type="text" required minLength={3} maxLength={50} value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <p className="text-gray-400 text-sm mt-1">3-50 characters</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
              <input id="password" type="password" required minLength={8} maxLength={128} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" />
              <p className="text-gray-400 text-sm mt-1">8-128 characters</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-white font-medium mb-2">Phone</label>
              <input id="phone" type="tel" required minLength={10} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-white text-black rounded focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="1234567890" />
              <p className="text-gray-400 text-sm mt-1">At least 10 digits</p>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded">
              {loading ? 'Creating Account...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
