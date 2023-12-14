// UserDashboard.js
import React from 'react';
import { useAuth } from './AuthContext';

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            {user ? (
                <>
                    <h2>Welcome, {user.username}!</h2>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Please login</p>
            )}
        </div>
    );
};

export default UserDashboard;
