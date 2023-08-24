// Front-end View for all Items - Tier 1 #6

import React, { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from API
    fetch('/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            {/* items */}
            <a href={`/item/${item.id}`}>{item.name}</a>
            <a href={`/item/${item.id}`}>{item.price}</a>
            <a href={`/item/${item.id}`}>{item.image}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
