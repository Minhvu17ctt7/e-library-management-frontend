import { useState, useEffect } from "react";
import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import { Button, Card, Form } from "react-bootstrap";
import bookApi from "api/bookApi";
import { useRouter } from "next/router";
import { BASE_URL } from "api/axiosClients";

export default function Search() {
    const router = useRouter();
    const [books, setBooks] = useState();
    const [page, setPage] = useState();
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        (async () => {
            const page = router.query.id || 1;
            setPage(page)
            //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
            const start = +page === 1 ? 0 : (+page - 1) * 4;
            const books = await bookApi.getBooks(start);
            setBooks(books)
            //Tính tổng page
            const numberOfMovies = await bookApi.countBook();
            const totalPage = Math.floor(numberOfMovies / 3)
            setTotalPage(totalPage)
        })()
    }, [])
    return (
        <>
            <Header />
            <main style={{ height: '85vh' }}>
                <Form className="ml-5 d-inline">
                    <Form.Group className="w-25">
                        <Form.Label>Tra cứu sách</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sách" required />
                    </Form.Group>
                </Form>
                {books && <section style={{ backgroundColor: "#eee" }}>
                    <div className="row">
                        {books.map(book => (
                            <div className="col-lg-3 col-md-3 mb-3">
                                <div className="card">
                                    <div
                                        className="bg-image hover-zoom ripple ripple-surface ripple-surface-light text-center"
                                        data-mdb-ripple-color="light"
                                    >
                                        <img
                                            src={book.photo ? `${BASE_URL}${book.photo.url}` : "/image/thumbnail.png"}
                                            className="w-50"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <a href="" className="text-reset">
                                            <h5 className="card-title mb-3">{book.name}</h5>
                                        </a>
                                        <a href="" className="text-reset">
                                            <p>Category</p>
                                        </a>
                                        <h6 className="mb-3">$61.99</h6>
                                    </div>
                                </div>
                            </div>))}
                    </div>
                </section>}
            </main>
            <Footer />
        </>
    );
}
