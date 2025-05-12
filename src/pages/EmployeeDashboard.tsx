// src/pages/EmployeeDashboard.tsx
import React, { useEffect, useState } from 'react';
import AppraisalForm from '../components/AppraisalForm';
// import Layout from '../components/Layout';
interface User {
    name: string;
    email: string;
}
const EmployeeDashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Replace with your actual API call logic
        fetch(`${process.env.REACT_APP_API_URL}/users/me`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error('Error fetching user:', err));
    }, []);
    return (
        <div>
            <nav className="dashboard-navbar">
                <span className="dashboard-title">Employee Appraisal System</span>
                <span className="dashboard-user">Welcome, {user?.name || 'Loading...'}</span>
            </nav>
            <h1>Welcome, Employee</h1>
            <AppraisalForm />
        </div>
    );
};

export default EmployeeDashboard;
