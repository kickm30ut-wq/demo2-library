import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/studentService';

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProfile(user.id, formData);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error updating profile.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {msg && <div className="mb-6 p-3 bg-emerald-50 text-emerald-800 text-sm border border-emerald-200 rounded-md">{msg}</div>}

      <div className="bg-white p-8 border border-zinc-200 rounded-md shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" disabled value={user?.email || ''} className="w-full p-2 border border-zinc-200 bg-zinc-50 text-zinc-500 rounded-md cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="text" required value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input type="text" required value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" />
          </div>
          <button type="submit" className="w-full py-2 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
