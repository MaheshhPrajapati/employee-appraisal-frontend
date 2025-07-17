import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const secretKey: any = process.env.REACT_APP_SECRET_KEY;
  const navigate = useNavigate();

  function encrypt(password: string): string {
    console.log(process.env, process.env.REACT_APP_API_URL, process.env.REACT_APP_SECRET_KEY)
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  const handleLogin = async (email: string, password: string) => {
    const userRole = localStorage.getItem("userRole");
    if(!userRole){
      alert('please select employee or manager');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/employee-appraisal-system/employee-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empUserName: email, password: password })
        // body: JSON.stringify({ email, password: encrypt(password) })
      });

      // if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      if(data.message.includes('Invalid')){
        alert(`Login Failed: ${data.message}`);
      }
      if(data.message.includes('uccess')) {
        localStorage.setItem("empId", data.employeeRes.empId)
        localStorage.setItem("empUserName", data.employeeRes.empUserName)
        navigate('/backend/dashboard');
      }
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
