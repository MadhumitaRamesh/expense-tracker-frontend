// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem('token') || localStorage.getItem('username');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

