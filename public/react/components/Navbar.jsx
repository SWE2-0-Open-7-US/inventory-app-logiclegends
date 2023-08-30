import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, Badge, Button, Container} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../inventory.png';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartLength(cartItems.length);
  }, [localStorage.getItem('cart')]);

  function logoutFunc() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/items');
  }

  return (
    <BootstrapNavbar expand="lg" bg="light" variant="light" sticky="top" className="border-bottom" style={{ borderBottomWidth: '5px' }}>
      <Container>
        {/* Logo */}
        <Link to="/items">
          <BootstrapNavbar.Brand>
            <img
              src={logo}
              style={{width: 30, height: 30}}
              alt="Logo"
            />
          </BootstrapNavbar.Brand>
        </Link>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item >
              <Nav.Link as={Link} to="/items">Items</Nav.Link>
            </Nav.Item >
            <Nav.Item >
              <Nav.Link as={Link} to="/items/addItem">Create Item</Nav.Link>
            </Nav.Item >
            <Nav.Item >
              <Nav.Link as={Link} to="/cart">
                Cart <Badge>{cartLength}</Badge>
              </Nav.Link>
            </Nav.Item >
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <>
                <Nav.Item >
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </Nav.Item >
                <Nav.Item >
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav.Item >
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Item className="navbar-text text-dark">
                  Welcome, {localStorage.getItem("username")}!
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link onClick={logoutFunc} >Logout</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
