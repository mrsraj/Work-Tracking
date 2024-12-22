import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './Register.module.css'; // Import the CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                email,
                password,
                phone_number: phoneNumber,
            });
            setMessage('Registration successful! Please log in.');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className={style.register_container}>
            <h2 className={style.header}>Register</h2>
            <form className={style.register_form} onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            {message && <p className={style.register_message}>{message}</p>}
            <p>Already have an account? <Link to="/login">Login here</Link></p> {/* Link to Login */}
        </div>
    );
};

export default Register;