import React, { useState, useEffect } from 'react';
import { getStudents, updateStudentStatus } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';

export default function Students() {
  const { user: admin } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleToggleStatus = (student) => {
    if (window.confirm(`Are you sure you want to ${student.status === 'active' ? 'deactivate' : 'activate'} this student?`)) {
      const newStatus = student.status === 'active' ? 'inactive' : 'active';
      updateStudentStatus(admin.id, student.id, newStatus);
      setStudents(getStudents());
    }
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase()) || 
    s.phone.includes(search)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Students Directory</h1>
        <input 
          type="text" 
          placeholder="Search name, email, phone..." 
          className="p-2 border border-zinc-300 rounded-md outline-none focus:border-zinc-500 text-sm w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-md overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-sm">
              <th className="p-4 font-medium text-zinc-600">Name</th>
              <th className="p-4 font-medium text-zinc-600">Contact</th>
              <th className="p-4 font-medium text-zinc-600">ID Proof</th>
              <th className="p-4 font-medium text-zinc-600">Status</th>
              <th className="p-4 font-medium text-zinc-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-zinc-100 text-sm">
                <td className="p-4 font-medium text-zinc-900">{s.name}</td>
                <td className="p-4">
                  <p>{s.email}</p>
                  <p className="text-zinc-500 text-xs">{s.phone}</p>
                </td>
                <td className="p-4">{s.idProof}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${s.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {s.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleToggleStatus(s)} className="text-xs font-medium px-3 py-1 border border-zinc-300 rounded hover:bg-zinc-50 transition-colors">
                    {s.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-8 text-center text-zinc-500">No students found.</div>}
      </div>
    </div>
  );
}
