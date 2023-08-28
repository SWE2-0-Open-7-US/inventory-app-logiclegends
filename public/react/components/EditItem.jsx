import React, { useState } from 'react';
import apiURL from '../api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';


export const EditItem = ({item, setIsEdit, id}) => {
    const [updatedItem, setUpdatedItem] = useState({
        name: item.name,
        image: item.image,
        description: item.description,
        price: item.price,
        category: item.category,
    });

    const editItem = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${apiURL}/items/${id}`, {
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
        <Container className="my-3">
            <h2>Edit Item</h2>
            <Form onSubmit={editItem}>
                <FloatingLabel
                    controlId="floatingItemName"
                    label="Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="name"
                        value={updatedItem.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingItemImageURL"
                    label="Image URL"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="image"
                        value={updatedItem.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        required
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingItemDescription"
                    label="Description"
                    className="mb-3"
                >
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={updatedItem.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingItemPrice"
                    label="Price"
                    className="mb-3"
                >
                    <Form.Control
                        type="number"
                        name="price"
                        value={updatedItem.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingItemCategory"
                    label="Category"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="category"
                        value={updatedItem.category}
                        onChange={handleChange}
                        placeholder="Category"
                        required
                    />
                </FloatingLabel>

                <Button type="submit">Update Item</Button>
            </Form>
        </Container>
    )
}
