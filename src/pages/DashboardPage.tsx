// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Replace with your actual API call logic
    fetch(`${process.env.REACT_APP_API_URL}/users/me`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user:', err));
  }, []);
  return (
     <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <span className="dashboard-title">Employee Appraisal System</span>
        <span className="dashboard-user">Welcome, {user?.name || 'Loading...'}</span>
      </nav>
      
      <button className="appraisal-button" onClick={() => { navigate('/backend/employeeDashboard') }}>+ Fill Appraisal Form</button>

      <div className="dashboard-content">
        <h2 className="dashboard-heading">Dashboard</h2>
        <div className="dashboard-user-info">
          <h3>User Info:</h3>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
