// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // check session marker or token
  const logged = localStorage.getItem('username') || localStorage.getItem('token');
  if (!logged) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
