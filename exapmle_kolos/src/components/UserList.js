// UserList.js

import React, { useState, useEffect } from 'react';
import userData from '../users.json';
import '../style/UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Ustaw dane z pliku JSON bezpośrednio
        setUsers(userData.users);
    }, []); // Pusta tablica oznacza, że useEffect wykona się tylko raz, po zamontowaniu komponentu

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.id} - {user.name} - {user.email} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
