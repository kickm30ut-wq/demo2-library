import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LayoutDashboard, Grid, Users, BookOpenCheck, Shield, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout() {
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
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Live Seats', path: '/admin/seats', icon: Grid },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Bookings', path: '/admin/bookings', icon: BookOpenCheck },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row text-zinc-900 font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-900 text-white border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">Admin Portal</span>
        </div>
        <button className="p-2 -mr-2 text-zinc-300" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar (Drawer on mobile, static sidebar on desktop) */}
      <aside className={`
        fixed inset-0 z-50 bg-zinc-900 text-zinc-300 flex flex-col transition-transform transform md:relative md:translate-x-0 md:w-64 md:border-r md:border-zinc-800
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight">Admin Portal</span>
          </div>
          <button className="md:hidden p-2 -mr-2 text-zinc-400" onClick={closeMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="font-medium text-white truncate">{user?.name}</p>
          <p className="text-xs text-zinc-500">Administrator</p>
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
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800 hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />
                {nav.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white w-full transition-colors">
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
