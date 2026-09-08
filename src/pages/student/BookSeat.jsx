import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { checkAvailability, createBooking } from '../../services/bookingService';

export default function BookSeat() {
  const { seatId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookingType, setBookingType] = useState('hourly');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [plan, setPlan] = useState('Monthly');
  
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate amount dynamically
  useEffect(() => {
    setError('');
    if (bookingType === 'hourly') {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      const startMs = (sh * 60 + sm) * 60000;
      const endMs = (eh * 60 + em) * 60000;
      const diffHrs = (endMs - startMs) / 3600000;

      if (diffHrs < 1) {
        setError('Minimum booking duration is 1 hour.');
        setAmount(0);
      } else if (sh < 9 || eh > 21 || (eh === 21 && em > 0)) {
        setError('Booking must be within 9:00 AM - 9:00 PM.');
        setAmount(0);
      } else {
        setAmount(Math.ceil(diffHrs * 29));
      }
    } else {
      if (plan === 'Monthly') setAmount(999);
      if (plan === 'Quarterly') setAmount(2699);
      if (plan === 'Half-Yearly') setAmount(4999);
    }
  }, [bookingType, startTime, endTime, plan]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (error) return;

    try {
      let startTs, endTs;

      if (bookingType === 'hourly') {
        const dateObj = new Date(date);
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);
        
        startTs = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), sh, sm).getTime();
        endTs = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), eh, em).getTime();
        
        if (startTs <= Date.now() - 60000) { // allowing 1 minute grace
          throw new Error('Start time cannot be in the past.');
        }
      } else {
        // Subscription
        const dateObj = new Date(date);
        startTs = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 9, 0).getTime();
        
        let days = 30;
        if (plan === 'Quarterly') days = 90;
        if (plan === 'Half-Yearly') days = 180;
        
        endTs = startTs + (days * 24 * 60 * 60 * 1000);
      }

      if (!checkAvailability(seatId, startTs, endTs)) {
        throw new Error('This seat is already booked for the selected time range. Please choose a different time or seat.');
      }

      createBooking(user.id, {
        seatId,
        type: bookingType,
        plan: bookingType === 'subscription' ? plan : 'none',
        startTime: startTs,
        endTime: endTs,
        amount
      });

      setSuccessMsg('Booking successful! Redirecting...');
      setTimeout(() => navigate('/student/bookings'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (successMsg) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center mt-10">
        <div className="bg-emerald-50 text-emerald-800 p-8 border border-emerald-200 rounded-md">
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p>{successMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Book Seat {seatId}</h1>
        <button onClick={() => navigate('/student/seats')} className="text-sm font-medium text-zinc-500 hover:text-zinc-900">&larr; Back to map</button>
      </div>

      <div className="bg-white p-8 border border-zinc-200 rounded-md shadow-sm">
        <div className="flex gap-4 mb-6">
          <button 
            type="button"
            onClick={() => setBookingType('hourly')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${bookingType === 'hourly' ? 'border-zinc-900 text-zinc-900' : 'border-zinc-200 text-zinc-400 hover:text-zinc-600'}`}
          >
            Hourly Booking
          </button>
          <button 
            type="button"
            onClick={() => setBookingType('subscription')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${bookingType === 'subscription' ? 'border-zinc-900 text-zinc-900' : 'border-zinc-200 text-zinc-400 hover:text-zinc-600'}`}
          >
            Subscription
          </button>
        </div>

        {error && <div className="mb-6 p-3 bg-rose-50 text-rose-700 text-sm border border-rose-200 rounded-md">{error}</div>}

        <form onSubmit={handleBooking} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {bookingType === 'hourly' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input 
                  type="time" 
                  required
                  min="09:00"
                  max="21:00"
                  className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Time</label>
                <input 
                  type="time" 
                  required
                  min="09:00"
                  max="21:00"
                  className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Subscription Plan</label>
              <select 
                className="w-full p-2 border border-zinc-300 rounded-md focus:border-zinc-500 outline-none"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="Monthly">Monthly (30 Days) - ₹999</option>
                <option value="Quarterly">Quarterly (90 Days) - ₹2,699</option>
                <option value="Half-Yearly">Half-Yearly (180 Days) - ₹4,999</option>
              </select>
              <p className="mt-2 text-xs text-zinc-500 text-left">
                * Subscription gives exclusive access to this seat for the duration. It automatically expires at the end of the term.
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-zinc-100 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-1">Total Amount</p>
              <p className="text-3xl font-extrabold text-zinc-900">₹{amount}</p>
            </div>
            <button 
              type="submit" 
              disabled={amount <= 0 || !!error}
              className={`px-8 py-3 font-medium rounded-md transition-colors ${amount > 0 && !error ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
