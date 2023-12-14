// App.js

import React from 'react';
import UserList from './components/UserList';
import UserListWithFilter from './components/UserListWithFilters';
import UserListWithSearch from './components/UserListWithSearch';
import { AuthProvider } from './components/AuthContext';
import LoginForm from './components/LoginForm';
import UserDashboard from './components/UserDashboard';

const App = () => {

    return (
        <div>
            {/* User List without filters */}
            <UserList />

            {/* User List with filters */}
            <UserListWithFilter />

            {/* User List with search */}
            <UserListWithSearch />

            <AuthProvider>
                <div>
                    <h1>Simple Authentication App</h1>
                    <LoginForm />
                    <UserDashboard />
                </div>
            </AuthProvider>
        </div>
    );
};

export default App;
