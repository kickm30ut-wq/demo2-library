import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Menu, X } from 'lucide-react';

export default function PublicLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <BookOpen className="w-6 h-6 text-zinc-800" />
            <span className="font-bold text-xl tracking-tight">Abhishek Library</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-sm font-medium hover:text-zinc-500">Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-zinc-500">About</Link>
            <Link to="/facilities" className="text-sm font-medium hover:text-zinc-500">Facilities</Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-zinc-500">Pricing</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
                className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-md transition-colors"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium hover:text-zinc-500">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-md transition-colors">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-zinc-600" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-4 flex flex-col gap-4 shadow-sm absolute w-full">
            <Link to="/" className="text-sm font-medium hover:text-zinc-500" onClick={closeMenu}>Home</Link>
            <Link to="/about" className="text-sm font-medium hover:text-zinc-500" onClick={closeMenu}>About</Link>
            <Link to="/facilities" className="text-sm font-medium hover:text-zinc-500" onClick={closeMenu}>Facilities</Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-zinc-500" onClick={closeMenu}>Pricing</Link>
            <hr className="border-zinc-100" />
            {user ? (
              <button 
                onClick={() => { closeMenu(); navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'); }}
                className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-md transition-colors w-full text-center"
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors text-center" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 rounded-md transition-colors text-center" onClick={closeMenu}>Register</Link>
              </div>
            )}
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Abhishek Library. Raigarh, Chhattisgarh.</p>
        </div>
      </footer>
    </div>
  );
}
