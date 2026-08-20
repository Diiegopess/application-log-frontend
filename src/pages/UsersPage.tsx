import React from 'react';
import { useUsers } from '../domains/users/useUsers';
import { UsersTable } from '../domains/users/UsersTable';
import Spinner from '../shared/components/Spinner';

export const UsersPage: React.FC = () => {
  const {
    users,
    loading,
    actionLoadingId,
    error,
    refetch,
    toggleUserStatus,
    toggleUserRole,
  } = useUsers();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-sm text-gray-500">
            Listado y administración de cuentas registradas en el sistema
          </p>
        </div>
        <button
          onClick={refetch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50"
        >
          Refrescar
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {!loading && (
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <UsersTable
            users={users}
            actionLoadingId={actionLoadingId}
            onToggleStatus={toggleUserStatus}
            onToggleRole={toggleUserRole}
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;