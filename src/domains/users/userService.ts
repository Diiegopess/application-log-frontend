import apiClient from '../../core/api/apiClient';
import type { User } from './user.types';

export async function fetchMe(): Promise<User> {
  const resp = await apiClient.get<User>('/users/me');
  return resp.data;
}

export async function fetchUsers(): Promise<User[]> {
  const resp = await apiClient.get<User[]>('/users');
  return resp.data;
}

export async function fetchUser(id: string): Promise<User> {
  const resp = await apiClient.get<User>(`/users/${id}`);
  return resp.data;
}