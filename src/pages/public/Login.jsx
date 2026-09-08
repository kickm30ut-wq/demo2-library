import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login(formData.emailOrPhone, formData.password);
      if (user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const loadDemo = (role) => {
    if (role === 'student') setFormData({ emailOrPhone: 'student@abhisheklibrary.com', password: 'student123' });
    else setFormData({ emailOrPhone: 'admin@abhisheklibrary.com', password: 'admin123' });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 border border-zinc-200 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-sm border border-rose-200 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email or Phone</label>
            <input 
              type="text" 
              required
              className="w-full p-2 border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-500"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-2 border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors">
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-100 text-center text-sm">
          <p className="text-zinc-600 mb-2">Don't have an account? <Link to="/register" className="text-zinc-900 font-bold hover:underline">Register</Link></p>
          <div className="mt-4 flex gap-2 justify-center">
            <button type="button" onClick={() => loadDemo('student')} className="text-xs bg-zinc-100 px-3 py-1 rounded hover:bg-zinc-200">Load Student Demo</button>
            <button type="button" onClick={() => loadDemo('admin')} className="text-xs bg-zinc-100 px-3 py-1 rounded hover:bg-zinc-200">Load Admin Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
