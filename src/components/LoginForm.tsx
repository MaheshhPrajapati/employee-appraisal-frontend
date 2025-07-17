import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };
    const handleChange = (userRole : string) => {
        if(userRole){
            localStorage.setItem("userRole", userRole);
        }
        
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>
         <div className="radio-group">
            <label className="radio-item">
                <input
                type="radio"
                name="userRole"
                value="Employee"
                onChange={() => handleChange("Employee")}
                />
                Employee
            </label>
            <label className="radio-item">
                <input
                type="radio"
                name="userRole"
                value="Manager"
                // checked={role === 'Manager'}
                onChange={() => handleChange("Manager")}
                />
                Manager
            </label>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <div className="password-container password-ctn">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                         
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        <i className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>

                </div>
            </div>

            <button type="submit" className="login-button">
                Login
            </button>
            <div className="login-links">
                {/* <a href="/account/signup">Don't have an account? Sign up</a> */}
                <br />
                <a className='link' onClick={() => {navigate('/account/forgotPassword')}}></a> {/* placeholder for now */}
            </div>
        </form>
    );
};

export default LoginForm;
