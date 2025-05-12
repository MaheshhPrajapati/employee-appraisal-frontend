import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeDashboard from './pages/EmployeeDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/account/login" replace />} />
        <Route path="/account/login" element={<LoginPage />} />
        <Route path="/account/signup" element={<SignupPage />} />
        <Route path="/backend/dashboard" element={<DashboardPage />} />
        <Route path="/backend/employeeDashboard" element={<EmployeeDashboard />} />

      </Routes>
    </Router>
  );
};
export default App;
