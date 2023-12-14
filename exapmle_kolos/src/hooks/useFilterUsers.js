// useFilterUsers.js

import { useState, useEffect } from 'react';

const useFilterUsers = (users) => {
    const [role, setRole] = useState('Administrator');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Filtruj użytkowników na podstawie roli
        const filtered = users.filter(user => user.role === role);
        setFilteredUsers(filtered);
    }, [users, role]);

    return [filteredUsers, role, setRole];
};

export default useFilterUsers;
