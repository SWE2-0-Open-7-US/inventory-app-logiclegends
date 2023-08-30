import React, { useState, useEffect } from 'react';
import apiURL from '../api';
import { Container } from 'react-bootstrap';

const Confirmation = () => {
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        createOrder();
    }, []);

    const createOrder = async () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')).map(item => item.id) || [];
        const userId = JSON.parse(localStorage.getItem('id')) || null;

        try {
            const response = await fetch(`${apiURL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems: cartItems, userId: userId })
            });

            const data = await response.json();

            if (response.ok) {
                setOrderId(data);
                localStorage.removeItem('cart');
            } else {
                console.error("Error creating order");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container className='mt-4'>
            {orderId ? (
                <>
                    <p>Your purchase has been successfully completed.</p>
                    <p>Order Number #{orderId}</p>
                </>
            ) : (
                <p>Processing your order...</p>
            )}
        </Container>
    );
};

export default Confirmation;
