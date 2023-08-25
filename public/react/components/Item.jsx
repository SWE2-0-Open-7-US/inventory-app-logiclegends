import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiURL from '../api';
import { EditItem } from './EditItem';


export const Item = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams()

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        fetchItem()
    }, [id, isEdit])

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
                    <button onClick={() => setIsEdit(!isEdit)} >Edit Item</button>
                    {isEdit && (
                        <EditItem setIsEdit={setIsEdit} item={item} id={id} />
                    )}
                </>
            )}
        </div>
    )
}
