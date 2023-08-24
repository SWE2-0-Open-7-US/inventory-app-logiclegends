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

    // router.get('/:id', async (req, res) => {
    //     const item = await Item.findByPk(req.params.id);
    //     if (item) {
    //         res.json(item);
    //     } else {
    //         res.status(404).send('Item not found');
    //     }
    // });

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
