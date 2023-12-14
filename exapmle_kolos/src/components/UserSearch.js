// UserSearch.js

import React, { useState, useRef } from 'react';

const UserSearch = ({ onSearch, onClear }) => {
    const searchInputRef = useRef(null);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchInputRef.current.value);
        }
    };

    const clearSearch = () => {
        if (onClear) {
            onClear();
        }
        searchInputRef.current.value = '';
    };

    return (
        <div>
            <label>Search by Name: </label>
            <input
                type="text"
                ref={searchInputRef}
                onChange={handleSearch}
                placeholder="Enter name..."
            />
            <button onClick={clearSearch}>Clear</button>
        </div>
    );
};

export default UserSearch;
