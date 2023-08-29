import React from 'react';
import { useEffect } from 'react';

const Confirmation = () => {
    useEffect(() => {
        localStorage.removeItem('cart');
    })
    return (
    <div>
        <p>Your purchase has been successfully completed.</p>
    </div>
    );
};

export default Confirmation;
