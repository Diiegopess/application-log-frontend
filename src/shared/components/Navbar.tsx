import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../domains/auth/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <span className="font-bold text-lg text-blue-600">
              AppLogs
            </span>
            <div className="flex space-x-2">
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>
              <NavLink to="/users" className={navLinkClasses}>
                Usuarios
              </NavLink>
              <NavLink to="/audit" className={navLinkClasses}>
                Auditoría
              </NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 hidden sm:inline-block">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;