import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LoginResponse, AuthUser } from './auth.types';
import { setAuthToken, clearAuthToken, getAuthToken } from '../../core/tokenHelper';

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (payload: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function parseJwt(token: string): AuthUser | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    
    // Log temporal para inspeccionar los claims reales del backend
    console.log('JWT Payload recibido:', parsed);

    return {
      email: parsed.email || parsed.username || (parsed.sub?.includes('@') ? parsed.sub : 'Sin correo'),
      full_name: parsed.full_name || parsed.name || (parsed.email ? parsed.email.split('@')[0] : 'Usuario'),
      sub: parsed.sub,
      is_superuser: parsed.is_superuser ?? false,
    };
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const userData = parseJwt(token);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (payload: LoginResponse) => {
    setAuthToken(payload.access_token);
    const userData = parseJwt(payload.access_token);
    setUser(userData);
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}