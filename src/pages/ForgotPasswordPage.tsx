import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import './ForgotPasswordPage.css';

const ForgotPasswordPage: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleReset = async (email: string) => {
    try {
      const response = await fetch(`${apiUrl}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to send reset email');

      const data = await response.json();
      console.log('Reset link sent:', data.message);
      alert('Password reset link sent to your email!');
    } catch (error) {
      console.error('Reset error:', error);
      alert('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page-container">
      <ForgotPasswordForm onReset={handleReset} />
    </div>
  );
};

export default ForgotPasswordPage;
