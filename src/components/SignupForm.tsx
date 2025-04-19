import React, { useState } from 'react';
import './SignupForm.css';


interface SignupFormProps {
    onSignup: (name: string, email: string, password: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onSignup(name, email, password);
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2 className="signup-title">Sign Up</h2>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
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

            <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-container">
                    <input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                        <i className={confirmPasswordVisible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>
                </div>
            </div>


            <button type="submit" className="signup-button">Sign Up</button>

            <div className="login-links">
                <a href="/account/login">Already have an account? Login</a>
                <br />
            </div>
        </form>
    );
};

export default SignupForm;
