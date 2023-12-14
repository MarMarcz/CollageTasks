// LoginForm.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        login(username);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
