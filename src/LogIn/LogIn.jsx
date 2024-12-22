import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './Login.module.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const isAuthenticated = localStorage.getItem('token'); // Check token outside handleLogin

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access);
            setMessage('Login successful!');
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setMessage('Logged out successfully.');
    };

    return (
        <div className={style.login_container}>
            <h2 className={style.login_logo}>Login</h2>
            <form className={style.login_form} onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {message && <p className={style.login_message}>{message}</p>}
            <p>
                Don't have an account?{" "}
                <Link to={isAuthenticated ? "#" : "/register"} onClick={isAuthenticated ? handleLogout : null}>
                    {isAuthenticated ? "LogOut" : "Register here"}
                </Link>
            </p>
        </div>
    );
};

export default LogIn;