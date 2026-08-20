import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../domains/auth/AuthContext';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

/**
 * MAPA PRINCIPAL DE RUTAS DE LA APLICACIÓN
 */
export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

      <Route path="/audit" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

      <Route path="/users" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
};