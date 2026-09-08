import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLiveSeatsStatus } from '../../services/seatService';

export default function Seats() {
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSeats(getLiveSeatsStatus());
    const interval = setInterval(() => {
      setSeats(getLiveSeatsStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.liveStatus !== 'GREEN') {
      alert(`Seat ${seat.number} is currently occupied.`);
      return;
    }
    navigate(`/student/book/${seat.id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Live Seat Map</h1>
          <p className="text-sm text-zinc-500 mt-1">Select an available green seat to book.</p>
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-100 border border-emerald-500 rounded"></div> Available</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-100 border border-amber-500 rounded"></div> Hourly Booked</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-rose-100 border border-rose-500 rounded"></div> Reserved</div>
        </div>
      </div>

      <div className="bg-white p-8 border border-zinc-200 rounded-md shadow-sm">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {seats.map(seat => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className={`
                aspect-square flex items-center justify-center font-bold text-sm rounded-md transition-all
                ${seat.liveStatus === 'GREEN' ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:border-emerald-500 cursor-pointer' : ''}
                ${seat.liveStatus === 'YELLOW' ? 'bg-amber-50 text-amber-800 border-2 border-amber-200 cursor-not-allowed opacity-80' : ''}
                ${seat.liveStatus === 'RED' ? 'bg-rose-50 text-rose-800 border-2 border-rose-200 cursor-not-allowed opacity-80' : ''}
              `}
              title={seat.liveStatus !== 'GREEN' ? 'Currently Occupied' : 'Click to book'}
            >
              {seat.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
