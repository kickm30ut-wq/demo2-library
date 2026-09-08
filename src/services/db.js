export const initDB = () => {
  if (!localStorage.getItem('library_users')) {
    const users = [
      { id: 'u1', name: 'Student Demo', email: 'student@abhisheklibrary.com', phone: '9876543210', password: 'student123', role: 'student', status: 'active', address: 'Raigarh', idProof: 'Aadhar', createdAt: Date.now() },
      { id: 'u2', name: 'Admin Demo', email: 'admin@abhisheklibrary.com', phone: '9999999999', password: 'admin123', role: 'admin', status: 'active', address: 'Library', idProof: 'Admin ID', createdAt: Date.now() }
    ];
    localStorage.setItem('library_users', JSON.stringify(users));
  }

  if (!localStorage.getItem('library_seats')) {
    const seats = Array.from({ length: 100 }, (_, i) => ({
      id: `S${String(i + 1).padStart(2, '0')}`,
      number: `S${String(i + 1).padStart(2, '0')}`,
      type: 'individual'
    }));
    localStorage.setItem('library_seats', JSON.stringify(seats));
  }

  if (!localStorage.getItem('library_bookings')) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * oneHour;
    
    // Seed some demo bookings
    const bookings = [
      {
        id: 'b1', reference: 'ABL-20240101-ABCDE', studentId: 'u1', seatId: 'S01', type: 'subscription', plan: 'Monthly',
        startTime: now - oneDay, endTime: now + 29 * oneDay, amount: 999, status: 'active', createdAt: now - oneDay
      },
      {
        id: 'b2', reference: 'ABL-20240101-VWXYZ', studentId: 'u1', seatId: 'S02', type: 'hourly', plan: 'none',
        startTime: now - oneHour, endTime: now + 2 * oneHour, amount: 87, status: 'active', createdAt: now - 2 * oneHour
      },
      {
        id: 'b3', reference: 'ABL-20240101-EXPIRED', studentId: 'u1', seatId: 'S03', type: 'hourly', plan: 'none',
        startTime: now - 5 * oneHour, endTime: now - 2 * oneHour, amount: 87, status: 'expired', createdAt: now - 6 * oneHour
      }
    ];
    localStorage.setItem('library_bookings', JSON.stringify(bookings));
  }
  
  if (!localStorage.getItem('library_audit_logs')) {
    localStorage.setItem('library_audit_logs', JSON.stringify([]));
  }
};
