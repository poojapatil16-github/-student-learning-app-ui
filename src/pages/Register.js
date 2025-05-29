import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await register(username, email, password);
            localStorage.setItem('token', res.data.token); // store JWT
            localStorage.setItem('username', res.data.username); // store JWT
            navigate('/profile'); // redirect after successful registration
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister} style={{maxWidth: '400px', margin: 'auto'}}>
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input
                    type="username"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}
