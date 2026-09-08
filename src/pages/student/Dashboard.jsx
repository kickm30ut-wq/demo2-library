import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMyBookings } from '../../services/bookingService';
import { getLiveSeatsStatus } from '../../services/seatService';
import { formatDateTime, getTimeRemaining } from '../../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const allBookings = getMyBookings(user.id);
    setBookings(allBookings);
    setActiveBooking(allBookings.find(b => b.status === 'active'));
    
    const seats = getLiveSeatsStatus();
    setAvailableSeatsCount(seats.filter(s => s.liveStatus === 'GREEN').length);
    
    // Set up a timer to refresh active booking countdown and status
    const interval = setInterval(() => {
      const refreshedBookings = getMyBookings(user.id);
      setBookings(refreshedBookings);
      setActiveBooking(refreshedBookings.find(b => b.status === 'active'));
      const newSeats = getLiveSeatsStatus();
      setAvailableSeatsCount(newSeats.filter(s => s.liveStatus === 'GREEN').length);
    }, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name.split(' ')[0]}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 mb-2">Available Seats Now</h3>
          <p className="text-3xl font-bold text-emerald-600">{availableSeatsCount} / 100</p>
          <Link to="/student/seats" className="text-sm font-medium text-zinc-900 mt-4 block hover:underline">Book a seat &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm md:col-span-2 flex flex-col justify-center">
          {activeBooking ? (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-1">Current Active Booking</h3>
                <p className="text-xl font-bold mb-1">Seat {activeBooking.seatId}</p>
                <span className="inline-block px-2 py-1 bg-zinc-100 text-xs rounded font-medium text-zinc-700">
                  {activeBooking.type === 'hourly' ? 'Hourly' : `Subscription: ${activeBooking.plan}`}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-500 mb-1">Time Remaining</p>
                <p className="text-2xl font-bold text-rose-600">
                  {getTimeRemaining(activeBooking.endTime)} {getTimeRemaining(activeBooking.endTime) !== 'Expired' && 'remaining'}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-zinc-500 mb-2">No Active Booking</h3>
              <p className="text-zinc-700">You don't have a seat reserved right now.</p>
              <Link to="/student/seats" className="mt-4 inline-block px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors">Book Now</Link>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Recent Bookings</h2>
      <div className="bg-white border border-zinc-200 rounded-md overflow-x-auto">
        {bookings.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">No bookings found.</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-sm">
                <th className="p-4 font-medium text-zinc-600">Reference</th>
                <th className="p-4 font-medium text-zinc-600">Seat</th>
                <th className="p-4 font-medium text-zinc-600">Type</th>
                <th className="p-4 font-medium text-zinc-600">End Time</th>
                <th className="p-4 font-medium text-zinc-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} className="border-b border-zinc-100 text-sm">
                  <td className="p-4">{b.reference}</td>
                  <td className="p-4 font-bold">{b.seatId}</td>
                  <td className="p-4 capitalize">{b.type}</td>
                  <td className="p-4 text-zinc-600">{formatDateTime(b.endTime)}</td>
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
        )}
      </div>
      {bookings.length > 5 && (
        <div className="mt-4 text-right">
          <Link to="/student/bookings" className="text-sm font-medium hover:underline">View all bookings &rarr;</Link>
        </div>
      )}
    </div>
  );
}
