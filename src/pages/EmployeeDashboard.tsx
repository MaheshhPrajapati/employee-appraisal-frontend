// src/pages/EmployeeDashboard.tsx
import React, { useEffect, useState } from 'react';
import AppraisalForm from '../components/AppraisalForm';
import PersonalDetailForm from '../components/PersonalDetailForm';
import './EmployeeDashboard.css'
import GoalSettingForm from '../components/GoalSettingForm';

// import Layout from '../components/Layout';
interface User {
    name: string;
    email: string;
}
const EmployeeDashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activePopup, setActivePopup] = useState<number | null>(1);

    function handleIconClick(num: number){
        setActivePopup(num);
    }

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
                <span className="dashboard-heading">Welcome, {user?.name || 'Loading...'}</span>
            </nav>
            <h1>Welcome, Employee</h1>
            <div className='outer-number-div'>
                <div className='number-icons'>
                    {[1, 2, 3].map(num => (
                        <button
                            key={num}
                            onClick={() => handleIconClick(num)}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                fontSize: '16px',
                                backgroundColor: activePopup === num ? '#007bff' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                            }}

                        >{num}</button>
                    ))}
                </div>
            </div>
            
            {
                activePopup == 1 ? <PersonalDetailForm num={activePopup} handleNumFunc={handleIconClick} /> : activePopup == 2 ? <AppraisalForm num={activePopup} handleNumFunc={handleIconClick} /> : <GoalSettingForm />
            }            
        </div>
    );
};

export default EmployeeDashboard;
