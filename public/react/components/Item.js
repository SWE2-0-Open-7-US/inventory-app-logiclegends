import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const Item = ({ match }) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItem()
    }, [match.params.id])

    const fetchItem = async () => {
        let response = await fetch(`${apiURL}/items/${match.params.id}`)
        let data = await response.json()
        setItem(data)
    }

    return (
        <div>
            {item && (
                <>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <p>Category: {item.category}</p>
                    <img src={item.image} alt={item.name} />
                </>
            )}
        </div>
    )
}
