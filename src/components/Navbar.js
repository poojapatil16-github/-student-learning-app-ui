import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">📘 Student Learning Tracker</div>

            <div className="navbar-links">
                <Link to="/profile">Profile</Link>
                <Link to="/topics">Topics</Link>
                <Link to="/progress">Progress</Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
