// src/App.jsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';              // update path if file lives in pages/
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
