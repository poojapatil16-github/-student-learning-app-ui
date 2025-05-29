import React from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
    const username = localStorage.getItem('username') || 'User';

    return (
        <>
            <Navbar />
            <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Welcome, {username}!</h2>
                <p>This is your profile page.</p>
                {/* Add more profile info here if needed */}
            </div>
        </>
    );
}
