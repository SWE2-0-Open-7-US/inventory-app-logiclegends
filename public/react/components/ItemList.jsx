
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import apiURL from '../api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { itemPriceFormatter } from '../utils/utils';

function ItemList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from API
    fetch(`${apiURL}/items`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <>
      <Container>
        <Row>
          {items.map(item => (
            <Col md={4} sm={6} xs={12} key={item.id} className="my-4">
              <Card style={{ cursor: 'pointer', minHeight: '100%' }}>
                <Card.Img onClick={() => navigate(`/items/${item.id}`)} variant="top" src={item.image} alt={`${item.name}`} style={{ height: '200px', padding: '5%', objectFit: 'contain' }} />
                <Card.Body >
                  <Card.Title style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Card.Title>
                  <Card.Text>{itemPriceFormatter.format(item.price)}</Card.Text>
                  <Button onClick={() => {
                    addToCart(item)
                    navigate('/cart')
                    }}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ItemList;


