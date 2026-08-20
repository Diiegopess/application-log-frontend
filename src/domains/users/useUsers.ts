import { useState, useEffect, useCallback } from 'react';
import type { User, UserUpdateAdminPayload } from './user.types';
import { fetchUsers, updateUserAdmin } from './userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      const msg =
        err.response?.data?.detail || err.message || 'Error al cargar usuarios';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = async (id: string, payload: UserUpdateAdminPayload) => {
    try {
      setActionLoadingId(id);
      setError(null);
      const updated = await updateUserAdmin(id, payload);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
      );
      return updated;
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        'Error al actualizar usuario';
      setError(msg);
      throw err;
    } finally {
      setActionLoadingId(null);
    }
  };

  const toggleUserStatus = async (user: User) => {
    return updateUser(user.id, { is_active: !user.is_active });
  };

  const toggleUserRole = async (user: User) => {
    return updateUser(user.id, { is_superuser: !user.is_superuser });
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    actionLoadingId,
    error,
    refetch: loadUsers,
    toggleUserStatus,
    toggleUserRole,
  };
};