import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initDB } from './services/db';

import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Facilities from './pages/public/Facilities';
import Pricing from './pages/public/Pricing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import StudentDashboard from './pages/student/Dashboard';
import Seats from './pages/student/Seats';
import BookSeat from './pages/student/BookSeat';
import MyBookings from './pages/student/MyBookings';
import Profile from './pages/student/Profile';

import AdminDashboard from './pages/admin/Dashboard';
import LiveSeats from './pages/admin/LiveSeats';
import Students from './pages/admin/Students';
import AdminBookings from './pages/admin/AdminBookings';
import AuditLogs from './pages/admin/AuditLogs';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="seats" element={<Seats />} />
            <Route path="book/:seatId" element={<BookSeat />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="seats" element={<LiveSeats />} />
            <Route path="students" element={<Students />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
