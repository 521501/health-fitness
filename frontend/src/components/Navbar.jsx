import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold">HealthFit</Link>
          
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                <Link to="/workouts" className="hover:text-blue-200">Workouts</Link>
                <Link to="/nutrition" className="hover:text-blue-200">Nutrition</Link>
                <Link to="/analytics" className="hover:text-blue-200">Analytics</Link>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">Login</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded">Register</Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 hover:bg-blue-500 rounded">Dashboard</Link>
              <Link to="/workouts" className="block px-3 py-2 hover:bg-blue-500 rounded">Workouts</Link>
              <Link to="/nutrition" className="block px-3 py-2 hover:bg-blue-500 rounded">Nutrition</Link>
              <Link to="/analytics" className="block px-3 py-2 hover:bg-blue-500 rounded">Analytics</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 bg-red-500 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 hover:bg-blue-500 rounded">Login</Link>
              <Link to="/register" className="block px-3 py-2 hover:bg-blue-500 rounded">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;