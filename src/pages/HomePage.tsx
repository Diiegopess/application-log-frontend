import React from 'react';
import GoogleLoginButton from '../domains/auth/GoogleLoginButton';

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <GoogleLoginButton />
    </div>
  );
};

export default HomePage;
