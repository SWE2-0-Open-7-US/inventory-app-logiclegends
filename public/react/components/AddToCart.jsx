import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function AddToCart({ item }) {
    const navigate = useNavigate()

    const addToCart = (item) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        cart.push(item);
        
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <Button onClick={() => {
            addToCart(item)
            navigate('/cart')
        }}>Add to Cart</Button>
    )
}

export default AddToCart;