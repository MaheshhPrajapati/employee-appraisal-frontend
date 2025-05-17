import React, { useState } from 'react';
import './ForgotPasswordForm.css';

interface ForgotPasswordFormProps {
  onReset: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onReset }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReset(email);
  };

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <h2 className="forgot-title">Forgot Password</h2>
      
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="reset-button">
        Send Reset Link
      </button>

      <div className="login-links">
        <a href="/account/login">← Back to Login</a>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
