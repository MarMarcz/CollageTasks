// UserListWithFilter.js

import React from 'react';
import useFilterUsers from '../hooks/useFilterUsers';
import userData from '../users.json';

const UserListWithFilter = () => {
    const [filteredUsers, role, setRole] = useFilterUsers(userData.users);

    return (
        <div>
            <h1>User List with Filter</h1>
            <div>
                <label>Filter by Role: </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Administrator">Administrator</option>
                    <option value="User">User</option>
                </select>
            </div>
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListWithFilter;
