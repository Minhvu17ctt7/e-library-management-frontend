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
      <main style={{ height: '85vh' }} className="d-flex ">
        <div
          id="intro-example"
          className="text-center img-fluid w-100"
          style={{ backgroundImage: "url('/image/background2.jpg')" }}
        >
          <div className="mask h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">E-library-management</h1>
                <h5 className="mb-4">Giải pháp quản lý thư viện hiệu quả</h5>
                <Link href="/login">
                  <button
                    className="btn btn-outline-light btn-lg m-2"
                    rel="nofollow"
                  >Login</button>
                </Link>
                <Link href="/search">
                  <button
                    className="btn btn-outline-light btn-lg m-2"
                    rel="nofollow"
                  >Search book</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
