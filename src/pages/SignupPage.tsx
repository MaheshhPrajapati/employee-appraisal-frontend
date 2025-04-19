import React from 'react';
import SignupForm from '../components/SignupForm';
import './SignupPage.css';

const SignupPage: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSignup = async (name: string, email: string, password: string) => {
        try {
            const response = await fetch(`${apiUrl}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) throw new Error('Signup failed');

            const data = await response.json();
            console.log('Signup Success:', data);
            // Redirect to login or dashboard
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    return (
        <div className="signup-page-container">
            <SignupForm onSignup={handleSignup} />
        </div>
    );
};

export default SignupPage;
