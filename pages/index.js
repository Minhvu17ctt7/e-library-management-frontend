import Head from "next/head";
import Image from "next/image";
import Footer from "../component/Layout/Footer";
import Header from "../component/Layout/Header";
import Layout from "../component/Layout/Layout";
import styles from "../styles/Home.module.css";
import { Card, Container, Form, Button } from "react-bootstrap"

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '85vh' }} className="d-flex ">
        <Card className="m-auto" style={{ width: "25rem" }}>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tìm kiếm sách</Form.Label>
                <Form.Control type="text" placeholder="Nhập tên sách" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Tìm kiếm
              </Button>
            </Form>
          </Card.Body>
        </Card></main>
      <Footer />
    </>
  );
}
