import React, { useState } from 'react';
import apiURL from '../api';
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // handler

    const newItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      category: itemCategory,
      image: image
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
        console.log('Item has been added'); // if success
        navigate('/items'); // Use navigate here
      } else {
        console.error('Failed to be add item'); // if fail
      }
    } catch (error) {
      console.error('An error occurred', error); // if error
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add New Item</h2>

      <Col md={6} lg={4} className="mx-auto">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingItemName"
            label="Item Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={itemName}
              placeholder="Item Name"
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingCategory"
            label="Category"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={itemCategory}
              placeholder="Category"
              onChange={(e) => setItemCategory(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingDescription"
            label="Item Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              value={itemDescription}
              placeholder="Item Description"
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPrice"
            label="Price"
            className="mb-3"
          >
            <Form.Control
              type="number"
              value={itemPrice}
              placeholder="Price"
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingimgURL"
            label="Image URL"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={image}
              placeholder="Image URL"
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" className="w-100">Add Item</Button>
        </Form>
      </Col>
    </Container>
  );
};

export default AddItemForm;
