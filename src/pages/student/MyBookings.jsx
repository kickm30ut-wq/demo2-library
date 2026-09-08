import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyBookings } from '../../services/bookingService';
import { formatDateTime, formatDate, formatTime } from '../../utils/helpers';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (user) setBookings(getMyBookings(user.id));
  }, [user]);

  const filtered = bookings.filter(b => {
    if (filter === 'All') return true;
    if (filter === 'Active') return b.status === 'active';
    if (filter === 'Upcoming') return b.status === 'upcoming';
    if (filter === 'Completed') return b.status === 'expired';
    return true;
  });

  const handleReceipt = (b) => {
    // Generate dummy receipt string
    const receipt = `ABHISHEK LIBRARY\nBooking Receipt\n----------------\nRef: ${b.reference}\nSeat: ${b.seatId}\nType: ${b.type}\nPlan: ${b.plan}\nStart: ${formatDateTime(b.startTime)}\nEnd: ${formatDateTime(b.endTime)}\nAmount: ₹${b.amount}\nStatus: ${b.status}\n----------------`;
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${b.reference}.txt`;
    a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Active', 'Upcoming', 'Completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${filter === f ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-8 text-center text-zinc-500 border border-zinc-200 rounded-md">No bookings found in this category.</div>
        ) : (
          filtered.map(b => (
            <div key={b.id} className="bg-white p-5 border border-zinc-200 rounded-md shadow-sm flex flex-col md:flex-row gap-4 justify-between md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-lg">{b.seatId}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    b.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'upcoming' ? 'bg-amber-100 text-amber-800' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>{b.status.toUpperCase()}</span>
                  <span className="text-xs text-zinc-500 font-mono">{b.reference}</span>
                </div>
                <div className="text-sm text-zinc-600">
                  <p><strong className="text-zinc-800 capitalize">{b.type}</strong> {b.type === 'subscription' && `(${b.plan})`}</p>
                  <p>{formatDate(b.startTime)} • {formatTime(b.startTime)} to {formatDate(b.endTime)} • {formatTime(b.endTime)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:flex-col md:items-end justify-between md:justify-center border-t border-zinc-100 pt-4 md:border-0 md:pt-0">
                <span className="text-lg font-bold text-zinc-900">₹{b.amount}</span>
                <button onClick={() => handleReceipt(b)} className="text-xs font-medium px-3 py-1.5 border border-zinc-300 rounded hover:bg-zinc-50">
                  Download Receipt
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
