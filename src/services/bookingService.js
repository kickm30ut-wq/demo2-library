import { generateId, generateBookingRef, hasOverlap } from '../utils/helpers';
import { createLog } from './auditService';

export const getBookings = () => JSON.parse(localStorage.getItem('library_bookings') || '[]');
const saveBookings = (bookings) => localStorage.setItem('library_bookings', JSON.stringify(bookings));

export const updateExpiredBookings = () => {
  const bookings = getBookings();
  let changed = false;
  const now = Date.now();
  
  const updated = bookings.map(b => {
    if ((b.status === 'active' || b.status === 'upcoming') && b.endTime < now) {
      changed = true;
      return { ...b, status: 'expired' };
    } else if (b.status === 'upcoming' && b.startTime <= now && b.endTime > now) {
      changed = true;
      return { ...b, status: 'active' };
    }
    return b;
  });
  
  if (changed) saveBookings(updated);
  return updated;
};

export const getMyBookings = (studentId) => {
  updateExpiredBookings();
  return getBookings().filter(b => b.studentId === studentId).sort((a, b) => b.createdAt - a.createdAt);
};

export const checkAvailability = (seatId, reqStart, reqEnd) => {
  updateExpiredBookings();
  const bookings = getBookings().filter(b => b.seatId === seatId && (b.status === 'active' || b.status === 'upcoming'));
  
  for (const b of bookings) {
    if (hasOverlap(reqStart, reqEnd, b.startTime, b.endTime)) {
      return false; // Conflict found
    }
  }
  return true;
};

export const createBooking = (studentId, data) => {
  if (!checkAvailability(data.seatId, data.startTime, data.endTime)) {
    throw new Error('Seat is not available for the selected time period due to conflicting bookings.');
  }
  
  const bookings = getBookings();
  const newBooking = {
    id: generateId(),
    reference: generateBookingRef(),
    studentId,
    ...data,
    status: data.startTime > Date.now() ? 'upcoming' : 'active',
    createdAt: Date.now()
  };
  
  bookings.push(newBooking);
  saveBookings(bookings);
  createLog('Booking Created', studentId, `Booking ${newBooking.reference} created for seat ${data.seatId}`);
  return newBooking;
};
