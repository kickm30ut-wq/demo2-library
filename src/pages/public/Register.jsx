import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', address: '', idProof: 'Aadhar', idProofImage: '', selfieImage: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, [field]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      const { confirmPassword, ...dataToSave } = formData;
      register(dataToSave);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-emerald-50 text-emerald-800 p-8 border border-emerald-200 rounded-md">
          <h2 className="text-2xl font-bold mb-2">Registration Successful</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white p-8 border border-zinc-200 rounded-md shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration</h2>
        {error && <div className="mb-6 p-3 bg-rose-50 text-rose-700 text-sm border border-rose-200 rounded-md">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input type="text" required className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" required className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <input type="tel" required pattern="[0-9]{10}" title="10 digit phone number" className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input type="text" required className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input type="password" required minLength="6" className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password *</label>
              <input type="password" required className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ID Proof Type</label>
              <select className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none" value={formData.idProof} onChange={(e) => setFormData({...formData, idProof: e.target.value})}>
                <option value="Aadhar">Aadhar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
            <div>
              <label className="block text-sm font-medium mb-1">Upload ID Proof Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'idProofImage')} className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Upload Selfie</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'selfieImage')} className="text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-6 bg-zinc-900 text-white font-medium rounded-md hover:bg-zinc-800 transition-colors">
            Complete Registration
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-zinc-600">
          Already have an account? <Link to="/login" className="text-zinc-900 font-bold hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
}
