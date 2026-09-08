import React, { useState, useEffect } from 'react';
import { getLiveSeatsStatus } from '../../services/seatService';
import { getStudents } from '../../services/studentService';
import { getBookings } from '../../services/bookingService';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 100, available: 0, sub: 0, hourly: 0, students: 0, todayBookings: 0 });

  useEffect(() => {
    const seats = getLiveSeatsStatus();
    const students = getStudents();
    const bookings = getBookings();
    
    const available = seats.filter(s => s.liveStatus === 'GREEN').length;
    const sub = seats.filter(s => s.liveStatus === 'RED').length;
    const hourly = seats.filter(s => s.liveStatus === 'YELLOW').length;
    
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => new Date(b.createdAt).toISOString().split('T')[0] === today).length;

    setStats({ total: 100, available, sub, hourly, students: students.length, todayBookings });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Available Seats', value: stats.available, color: 'text-emerald-600' },
          { label: 'Subscription Seats', value: stats.sub, color: 'text-rose-600' },
          { label: 'Hourly Booked', value: stats.hourly, color: 'text-amber-600' },
          { label: 'Total Students', value: stats.students, color: 'text-zinc-900' },
          { label: 'Today\'s Bookings', value: stats.todayBookings, color: 'text-zinc-900' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-zinc-500 mb-2">{s.label}</h3>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
