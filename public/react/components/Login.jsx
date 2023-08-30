import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiURL from '../api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [doesUserExist, setDoesUserExist] = useState(true)

  async function handleLogin(e) {
    e.preventDefault();
    let response = await fetch(`${apiURL}/users/${username}/${password}`);
    let data = await response.json()
    console.log(data);
    if (data.username === undefined) {
      setDoesUserExist(false)
      setPassword("")
      setUsername("")
    } else {
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username)
      localStorage.setItem("password", data.password);

      setIsLoggedIn(true)
      navigate("/items")
    }
  }

  return (
    <Container>
      <h2 className="my-4">Login</h2>

      <Col md={6} lg={4} className="mx-auto">
        <Form onSubmit={handleLogin}>
          <FloatingLabel
            controlId="floatingUsernameLogin"
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
            controlId="floatingPasswordLogin"
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

          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>

        {!doesUserExist &&
          <Alert variant="danger" className="mt-3">
            Invalid username or password, try again.
          </Alert>}
      </Col>
    </Container>
  )
}

export default Login;