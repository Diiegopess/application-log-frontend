import React from 'react';
import { User } from './user.types';

export const UserProfileCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Roles: {(user.roles || []).join(', ')}</p>
    </div>
  );
};

export default UserProfileCard;
