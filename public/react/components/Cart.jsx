import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { itemPriceFormatter } from '../utils/utils';
import { Alert } from 'react-bootstrap';

const Cart = ({isLoggedIn}) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function removeItem(index) {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container>
      <h2 className="my-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
              <Row className="align-items-center">
                <Col xs={3} md={2}>
                  <Image src={item.image} thumbnail style={{border: 'none', boxShadow: 'none'}}/>
                </Col>
                <Col xs={4} md={6}>
                  {item.name}
                </Col>
                <Col xs={3} md={2}>
                  {itemPriceFormatter.format(item.price)}
                </Col>
                <Col xs={2} md={2}>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => removeItem(index)}>
                     X 
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            ))}
          </ListGroup>
          <Table striped bordered className="mt-3">
            <tbody>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>{itemPriceFormatter.format(total)}</strong></td>
              </tr>
            </tbody>
          </Table>
{isLoggedIn ? (

          <Link to="/confirmation">
            <Button variant="success" className="mt-2">Proceed to Checkout</Button>
          </Link>
) : (
        <Alert className='mx-auto w-75'>Please Login to Checkout</Alert>
)}
        </>
      )}
    </Container>
  );
};

export default Cart;
