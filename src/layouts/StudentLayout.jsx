import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LayoutDashboard, CalendarDays, Clock, User, LogOut, Menu, X } from 'lucide-react';

export default function StudentLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navs = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Book Seat', path: '/student/seats', icon: CalendarDays },
    { name: 'My Bookings', path: '/student/bookings', icon: Clock },
    { name: 'Profile', path: '/student/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row text-zinc-900 font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">Abhishek Library</span>
        </div>
        <button className="p-2 -mr-2 text-zinc-600" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar (Drawer on mobile, static sidebar on desktop) */}
      <aside className={`
        fixed inset-0 z-50 bg-white flex flex-col transition-transform transform md:relative md:translate-x-0 md:w-64 md:border-r md:border-zinc-200
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">Abhishek Library</span>
          </div>
          <button className="md:hidden p-2 -mr-2 text-zinc-600" onClick={closeMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-zinc-500">Student Portal</p>
          <p className="font-medium truncate">{user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navs.map((nav) => {
            const Icon = nav.icon;
            const isActive = location.pathname.startsWith(nav.path);
            return (
              <Link
                key={nav.name}
                to={nav.path}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
              >
                <Icon className="w-4 h-4" />
                {nav.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-rose-600 hover:bg-rose-50 w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
