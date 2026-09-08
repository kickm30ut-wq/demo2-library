import { getBookings, updateExpiredBookings } from './bookingService';

export const getSeats = () => JSON.parse(localStorage.getItem('library_seats') || '[]');

export const getLiveSeatsStatus = () => {
  updateExpiredBookings();
  const seats = getSeats();
  const bookings = getBookings();
  const now = Date.now();
  
  return seats.map(seat => {
    // Find any active booking for this seat right NOW
    const activeBooking = bookings.find(b => 
      b.seatId === seat.id && 
      b.status === 'active' && 
      b.startTime <= now && 
      b.endTime > now
    );
    
    let status = 'GREEN';
    let currentBooking = null;
    
    if (activeBooking) {
      currentBooking = activeBooking;
      status = activeBooking.type === 'subscription' ? 'RED' : 'YELLOW';
    }
    
    return {
      ...seat,
      liveStatus: status,
      currentBooking
    };
  });
};
