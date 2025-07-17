// src/pages/EmployeeDashboard.tsx
import React, { useEffect, useState } from 'react';
import AppraisalForm from '../components/AppraisalForm';
import PersonalDetailForm from '../components/PersonalDetailForm';
import './EmployeeDashboard.css'
import GoalSettingForm from '../components/GoalSettingForm';
import { useNavigate } from 'react-router-dom';

// import Layout from '../components/Layout';
interface User {
    firstName: string;
    email: string;
}
const EmployeeDashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activePopup, setActivePopup] = useState<number | null>(1);
    const tabNames = ['personal details', 'goal setting', 'appraisal form'];
    const navigate = useNavigate();
    

    function handleIconClick(num: number) {
        setActivePopup(num);
    }

    useEffect(() => {
        // Replace with your actual API call logic
        const empId = localStorage.getItem("empId")
        fetch(`${process.env.REACT_APP_API_URL}/employee-appraisal-system/find-employee/${empId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error('Error fetching user:', err));
    }, []);
    return (
        <div>
            <nav className="dashboard-navbar">
                <span className="dashboard-title">Employee Appraisal System</span>
                <button className='button logout' onClick={() => {navigate('/account/login'); localStorage.clear();}}>Logout</button>
                <span className="dashboard-heading">Welcome, {user?.firstName || 'Loading...'}</span>
            </nav>
            <h1 className='heading1'>Welcome, Employee</h1>
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
            <div className='outer-number-div'>
                <div className='number-icons' style={{ width: '21%' }}>
                    {tabNames.map((item, idx) => (
                        <div key={idx} className='tab-names'>{item}</div>
                    ))}
                </div>
            </div>

            {
                activePopup === 1 ? <PersonalDetailForm num={activePopup} handleNumFunc={handleIconClick} /> : activePopup === 2 ? <AppraisalForm num={activePopup} handleNumFunc={handleIconClick} /> : <GoalSettingForm />
            }
        </div>
    );
};

export default EmployeeDashboard;
