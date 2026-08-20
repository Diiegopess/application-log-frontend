import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LoginResponse, AuthUser } from './auth.types';
import { setAuthToken, clearAuthToken, getAuthToken } from '../../core/tokenHelper';
import { fetchMe } from '../users/userService';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (payload: LoginResponse) => Promise<void>;
  logout: () => void;
  refreshUserProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUserProfile = async () => {
    try {
      const profile = await fetchMe();
      setUser({
        sub: profile.id,
        email: profile.email,
        full_name: profile.full_name || profile.email.split('@')[0],
        is_superuser: profile.is_superuser,
      });
    } catch {
      clearAuthToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      loadUserProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    
  }, []);

  const login = async (payload: LoginResponse) => {
    setAuthToken(payload.access_token);
    await loadUserProfile();
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  const refreshUserProfile = async () => {
    await loadUserProfile();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}