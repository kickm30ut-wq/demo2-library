import React, { useState, useEffect } from 'react';
import { getLiveSeatsStatus } from '../../services/seatService';
import { getStudents } from '../../services/studentService';
import { formatTime, formatDate, getTimeRemaining } from '../../utils/helpers';

export default function LiveSeats() {
  const [seats, setSeats] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    setSeats(getLiveSeatsStatus());
    setStudents(getStudents());
    const interval = setInterval(() => setSeats(getLiveSeatsStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getStudentName = (id) => students.find(s => s.id === id)?.name || 'Unknown';

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Live Seat Map</h1>
        </div>
        <div className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {seats.map(seat => (
              <button
                key={seat.id}
                onClick={() => setSelectedSeat(seat)}
                className={`
                  aspect-square flex items-center justify-center font-bold text-xs rounded transition-all border-2
                  ${seat.liveStatus === 'GREEN' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:border-emerald-500' : ''}
                  ${seat.liveStatus === 'YELLOW' ? 'bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-500' : ''}
                  ${seat.liveStatus === 'RED' ? 'bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-500' : ''}
                  ${selectedSeat?.id === seat.id ? 'ring-2 ring-zinc-900 ring-offset-2' : ''}
                `}
              >
                {seat.number}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-80">
        {selectedSeat ? (
          <div className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4">Seat {selectedSeat.number}</h2>
            
            {selectedSeat.liveStatus === 'GREEN' ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-md font-medium text-sm border border-emerald-200">
                Currently Available
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-zinc-500 font-medium text-xs mb-1">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${selectedSeat.liveStatus === 'RED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                    {selectedSeat.currentBooking?.type.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-zinc-500 font-medium text-xs mb-1">Student</p>
                  <p className="font-bold text-zinc-900">{getStudentName(selectedSeat.currentBooking?.studentId)}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-medium text-xs mb-1">Time Range</p>
                  <p>{formatDate(selectedSeat.currentBooking?.startTime)} - {formatDate(selectedSeat.currentBooking?.endTime)}</p>
                  <p>{formatTime(selectedSeat.currentBooking?.startTime)} - {formatTime(selectedSeat.currentBooking?.endTime)}</p>
                </div>
                <div className="pt-4 border-t border-zinc-100">
                  <p className="text-zinc-500 font-medium text-xs mb-1">Time Remaining</p>
                  <p className="text-lg font-bold text-zinc-900">{getTimeRemaining(selectedSeat.currentBooking?.endTime)}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 border border-zinc-200 rounded-md shadow-sm text-center text-zinc-500 text-sm">
            Click a seat to view details
          </div>
        )}
      </div>
    </div>
  );
}
