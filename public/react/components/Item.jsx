import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiURL from '../api';


export const Item = () => {
    const [item, setItem] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        fetchItem()
    }, [id])

    const fetchItem = async () => {
        let response = await fetch(`${apiURL}/items/${id}`)
        let data = await response.json()
        setItem(data)
    }

    return (
        <div>
            {item && (
                <>
                    <h2>{item.name}</h2>
                    <img src={item.image} alt={`${item.name}`} />
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <p>Category: {item.category}</p>
                </>
            )}
        </div>
    )
}
