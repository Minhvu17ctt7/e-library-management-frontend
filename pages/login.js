import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap"
import { useFormik } from "formik";
import { useRouter } from "next/router";
import authenApi from "api/authenApi";
import Cookies from "js-cookie";
import nookies from 'nookies'

const Login = () => {
  const [error, setError] = useState();
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await authenApi.login({ identifier: values.identifier, password: values.password });
        Cookies.set("jwt", res.jwt);
        Cookies.set("user", JSON.stringify(res.user));
        Cookies.set("isLoggedIn", true)
        // nookies.set(null, 'jwt', res.jwt, {
        //   maxAge: 30 * 24 * 60 * 60,
        // })
        // nookies.set(null, 'isLoggedIn', true, {
        //   maxAge: 30 * 24 * 60 * 60,
        // })

        // nookies.set(null, "user", JSON.stringify(res.user))
        router.push("/manage")

      } catch (error) {
        setError(true);
      }
    },
  });


  return (
    <Container style={{ minHeight: "100vh" }} className="d-flex">
      <Card className="m-auto" style={{ width: "25rem" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="identifier"
                onChange={formik.handleChange}
                value={formik.values.identifier}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Group>
            {error && <p className="text-danger">Has some error</p>}
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

