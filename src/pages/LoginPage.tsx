import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      console.log('Login Success:', data);
      // Store token or redirect here
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page-container">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
