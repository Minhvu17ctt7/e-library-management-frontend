import Head from "next/head";
import Image from "next/image";
import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import Layout from "component/Layout/Layout";
import styles from "styles/Home.module.css";
import { Card, Container, Form, Button, Carousel, FormLabel } from "react-bootstrap"
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Header />
      <main style={{ height: '85vh'}} className="d-flex ">
        <Carousel className="w-100">
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '85vh' }}
              className="d-block"
              src="/image/image-slider1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className={styles.sliderLabel}>

                <h4>Quản lý sách hiệu quả</h4>
                <p>Quản lý thư viện của bạn một cách hiệu quả, chính xác, đơn giản với E-library-management.</p>
              </div>
              <Link href="/search">
                <Button className={styles.buttonAction}>Search book</Button>
              </Link>
              <Link href="/login">
                <Button className={styles.buttonAction}>Login</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '85vh' }}
              className="d-block"
              src="/image/image-slider1.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <div className={styles.sliderLabel}>
                <h5>Tra cứu sách nhanh chóng</h5>
                <p></p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: '100%', height: '85vh' }}
              className="d-block"
              src="/image/image-slider1.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <div className={styles.sliderLabel}>
                <h5>Đơn giản, dễ dàng sử dụng</h5>
                <p>Tuân theo các quy trình, nghiệp vụ, các chuẩn của thư viện trường học từ khâu nhập sách, thanh lý sách, quản lý độc giả.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </main>
      <Footer />
    </>
  );
}
