import React from "react";
import { Card, Container, Form, Button } from "react-bootstrap"
import Link from 'next/link'

const Login = () => {
  return (
    <Container style={{ minHeight: "100vh" }} className="d-flex">
      <Card className="m-auto" style={{ width: "25rem" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Link href="/admin">
              <Button variant="primary" type="button">
                Login
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
