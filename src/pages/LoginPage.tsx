import React from 'react';
import GoogleLoginButton from '../domains/auth/GoogleLoginButton';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-600">AppLog</h1>
        <p className="text-gray-600 text-sm">Sistema de Gestión y Autenticación</p>
      </div>
      
      {/* Botón de login con Google */}
      <GoogleLoginButton />
    </div>
  );
};