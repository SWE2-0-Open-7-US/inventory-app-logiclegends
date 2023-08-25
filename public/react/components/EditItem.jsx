import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../api';


export const EditItem = ({item, setIsEdit, id}) => {
    const [updatedItem, setUpdatedItem] = useState({
        name: item.name,
        image: item.image,
        description: item.description,
        price: item.price,
        category: item.category,
    });
    // const {id} = useParams()
    const navigate = useNavigate()
    console.log(updatedItem)

    const editItem = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${apiURL}/items/edit/${id}`, {
                method: 'PUT',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updatedItem)
            })
            let data = await response.json()

            if (response.ok) {
                setIsEdit(false)
			}
        } catch (error) {
            console.log("Oh no an error! ", error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem({
            ...updatedItem,
            [name]: value,
        });
    };

    return (
        <div>
        <h2>Edit Item</h2>
        <form onSubmit={editItem}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={updatedItem.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={updatedItem.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={updatedItem.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={updatedItem.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={updatedItem.category}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Item</button>
        </form>
        </div>
    )
}
