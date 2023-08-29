// Front-end View for all Items - Tier 1 #6

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import apiURL from '../api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { itemPriceFormatter } from '../utils/utils';
import Filter from './Filter';

function ItemList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([{name: '', description: '', id: 0, price: 0, image: ''}]);

  useEffect(() => {
    // Fetch items from API
    fetchItems()
  }, []);

  const fetchItems = async () => {
    fetch(`${apiURL}/items`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const filterItems = async (criteria, query) => {
    try {
      const response = await fetch(`${apiURL}/items/filter?criteria=${criteria}&query=${query}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log("Error filtering", error);
    }
  };

  return (
    <>
      <Container>

        <Filter filterItems={filterItems} resetItems={fetchItems} />

        <Row>
          {items.map(item => (
            <Col md={4} sm={6} xs={12} key={item.id} className="mt-4">
              <Card style={{ cursor: 'pointer', minHeight: '100%' }} onClick={() => navigate(`/items/${item.id}`)}>
                <Card.Img variant="top" src={item.image} alt={`${item.name}`} style={{ height: '200px', padding: '5%', objectFit: 'contain' }} />
                <Card.Body >
                  <Card.Title style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Card.Title>
                  <Card.Text>{itemPriceFormatter.format(item.price)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          { !items.length && <h3 className="my-4">No items to show</h3>}
        </Row>
      </Container>
    </>
  );
}

export default ItemList;


