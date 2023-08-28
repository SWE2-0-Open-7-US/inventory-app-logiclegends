import React, { useState } from 'react';

function Filter({ filterItems }) {
    const [criteria, setCriteria] = useState('name'); 
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        filterItems(criteria, query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select 
                value={criteria} 
                onChange={e => setCriteria(e.target.value)}
            >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="description">Description</option>
            </select>
            <input 
                type="text" 
                placeholder="Filter items..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Filter</button>
        </form>
    );
}

export default Filter;
