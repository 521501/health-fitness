import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'; // Added /context
import Navbar from './components/Navbar';             // This is likely correct if the folder exists
import Dashboard from './pages/Dashboard';           // This is likely correct if the folder exists
import Login from './pages/Login';                   // This is likely correct if the folder exists
import Register from './pages/Register';             // This is likely correct if the folder exists
import ProtectedRoute from './components/ProtectedRoute'; // This is likely correct

// Mock pages for features not yet built
const Workout = () => <div className="p-8 text-2xl font-bold">Workout Page</div>;
const Nutrition = () => <div className="p-8 text-2xl font-bold">Nutrition Page</div>;
const Analytics = () => <div className="p-8 text-2xl font-bold">Analytics Page</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/workouts" element={
              <ProtectedRoute>
                <Workout />
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <Nutrition />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            
            {/* Fallback Routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;