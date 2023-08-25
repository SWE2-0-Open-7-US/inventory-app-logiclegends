// Front-End Adding an Item - Tier 2 #17

import React, { useState } from 'react';
import apiURL from '../api';
import {useNavigate} from "react-router-dom"

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // handler

    const newItem = {
      name: itemName,
      description: itemDescription,
    };

    try {
      const response = await fetch(`${apiURL}/items/addItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Item has been added'); // success
        navigate('/items'); // Use navigate here
      } else {
        console.error('Failed to be add item'); // fail
      }
    } catch (error) {
      console.error('An error occurred', error); // error
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)} // triggers event & will update
            required
          />
        </label>
        <label>
          Item Description:
          <textarea // for more writing
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
