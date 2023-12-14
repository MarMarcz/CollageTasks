// UserListWithSearch.js

import React, { useState } from 'react';
import UserSearch from './UserSearch';
import userData from '../users.json';

const UserListWithSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredUsers = userData.users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>User List with Search</h1>
            <UserSearch onSearch={handleSearch} onClear={clearSearch} />
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

export default UserListWithSearch;
