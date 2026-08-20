import apiClient from '../../core/api/apiClient'; // Usa '../../core/apiClient' 
import type { LoginResponse } from './auth.types';

export async function loginWithGoogle(tokenId: string): Promise<LoginResponse> {
  const resp = await apiClient.post<LoginResponse>('/auth/google', { 
    id_token: tokenId 
  });
  return resp.data;
}

export async function refreshSession() {
  const resp = await apiClient.post('/auth/refresh');
  return resp.data;
}