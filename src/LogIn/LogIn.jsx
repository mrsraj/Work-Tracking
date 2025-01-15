import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.css';
import { useMyContext } from '../ContextAPIs/ContextApi';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setLogin,setAuthenticated } = useMyContext()

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('user_id', response.data.user_id);

            if (response.statusText === "OK") {
                setLogin(response.statusText)
                setMessage('Login successful!');
                setUsername('');
                setPassword('');
                navigate('/showgroup');
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={style.login_container}>
            <h2 className={style.login_logo}>LogIn</h2>
            <form className={style.login_form} onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {message && <p className={style.login_message}>{message}</p>}
            <p>
                Don't have an account?{" "}
                <Link to="/register" >
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LogIn;