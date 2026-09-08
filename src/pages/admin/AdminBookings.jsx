import React, { useState, useEffect } from 'react';
import { getBookings, updateExpiredBookings } from '../../services/bookingService';
import { getStudents } from '../../services/studentService';
import { formatDateTime } from '../../utils/helpers';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    updateExpiredBookings();
    setBookings(getBookings().sort((a, b) => b.createdAt - a.createdAt));
    setStudents(getStudents());
  }, []);

  const getStudentName = (id) => students.find(s => s.id === id)?.name || 'Unknown';

  const filtered = bookings.filter(b => {
    if (filter === 'All') return true;
    if (filter === 'Active') return b.status === 'active';
    if (filter === 'Upcoming') return b.status === 'upcoming';
    if (filter === 'Completed') return b.status === 'expired';
    if (filter === 'Hourly') return b.type === 'hourly';
    if (filter === 'Subscription') return b.type === 'subscription';
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Active', 'Upcoming', 'Completed', 'Hourly', 'Subscription'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${filter === f ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border border-zinc-200 rounded-md overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-sm">
              <th className="p-4 font-medium text-zinc-600">Ref / Date</th>
              <th className="p-4 font-medium text-zinc-600">Student</th>
              <th className="p-4 font-medium text-zinc-600">Seat / Type</th>
              <th className="p-4 font-medium text-zinc-600">Start Time</th>
              <th className="p-4 font-medium text-zinc-600">End Time</th>
              <th className="p-4 font-medium text-zinc-600">Amount</th>
              <th className="p-4 font-medium text-zinc-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b border-zinc-100 text-sm">
                <td className="p-4">
                  <p className="font-mono text-xs">{b.reference}</p>
                  <p className="text-zinc-500 text-xs mt-1">{formatDateTime(b.createdAt)}</p>
                </td>
                <td className="p-4 font-medium">{getStudentName(b.studentId)}</td>
                <td className="p-4">
                  <p className="font-bold">{b.seatId}</p>
                  <p className="text-xs text-zinc-500 capitalize">{b.type} {b.plan !== 'none' && `(${b.plan})`}</p>
                </td>
                <td className="p-4">{formatDateTime(b.startTime)}</td>
                <td className="p-4">{formatDateTime(b.endTime)}</td>
                <td className="p-4 font-bold">₹{b.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    b.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'upcoming' ? 'bg-amber-100 text-amber-800' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>{b.status.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-8 text-center text-zinc-500">No bookings match the filter.</div>}
      </div>
    </div>
  );
}
