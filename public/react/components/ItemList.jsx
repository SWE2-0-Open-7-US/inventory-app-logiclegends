// Front-end View for all Items - Tier 1 #6

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import apiURL from '../api';

function ItemList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from API
    fetch(`${apiURL}/items`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {items.map(item => (
          <div className='all-items' key={item.id} onClick={()=>navigate(`/items/${item.id}`)}>
              <h2>{item.name}</h2>
              <img src={item.image} alt={`${item.name}`} />
              <p>${item.price}</p>
          </div>



        ))}
      </ul>
    </div>
  );
}

export default ItemList;


