import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import apiURL from '../api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [doesUserExist, setDoesUserExist] = useState(false)

  async function handleSignup(e) {
    e.preventDefault();
    const info = {
      username,
      password
    }
    let verifyRes = await fetch(`${apiURL}/users/${username}`);
    let verifyData = await verifyRes.json();

    if (verifyData) {
      setDoesUserExist(true)
      setPassword("")
      setUsername("")

    } else {
      let response = await fetch(`${apiURL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      })
      let data = await response.json();
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);

      setIsLoggedIn(true)
      navigate("/items")
    }
  }

  return (
    <Container>
      <h2 className="my-4">Sign Up</h2>

      <Col md={6} lg={4} className="mx-auto">
        <Form onSubmit={handleSignup}>
          <FloatingLabel
            controlId="floatingUsername"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
        </Form>

        {doesUserExist &&
          <Alert variant="danger" className="mt-3">
            User already exists, create a unique username
          </Alert>}
      </Col>
    </Container>
  );
}

export default Signup