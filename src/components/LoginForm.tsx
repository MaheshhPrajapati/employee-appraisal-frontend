import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Login</h2>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <div className="password-container">
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
                <a href="/account/signup">Don't have an account? Sign up</a>
                <br />
                <a href="#">Forgot password?</a> {/* placeholder for now */}
            </div>
        </form>
    );
};

export default LoginForm;
