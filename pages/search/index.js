import { BASE_URL } from "api/axiosClients";
import bookApi from "api/bookApi";
import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import Loading from "component/Loading/Loading";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import NoData from "component/NoData";

export default function Search() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState();
    const [keySearch, setKeySearch] = useState('');
    let page = +router.query.id || 1;
    const [totalPage, setTotalPage] = useState();
    const start = page === 1 ? 0 : (page - 1) * 4;
    const didMount = useRef(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
            const books = await bookApi.getBooks({ "_start": start });
            setBooks(books)
            //Tính tổng page
            const numberOfMovies = await bookApi.countBook();
            const totalPage = Math.floor(numberOfMovies / 3)
            setTotalPage(totalPage)
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        let timer;
        if (didMount.current) {
            timer = setTimeout(async () => {
                const books = await bookApi.getBooks({ "_start": start, "name": keySearch });
                setBooks(books);
            }, 500);
        }
        else didMount.current = true;

        return () => clearTimeout(timer);
    }, [keySearch]);

    const handleSearch = (event) => {
        setKeySearch(event.target.value);
    };

    return (
        <>
            {loading && <Loading />}
            <Header />
            <main style={{ height: '85vh' }}>
                <Form className="d-inline">
                    <Form.Group className="w-25 mx-5 my-3">
                        <Form.Label>Tra cứu sách</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sách" onChange={handleSearch} />
                    </Form.Group>
                </Form>
                {books && books.length <= 0 && !loading && <NoData />}
                {books && <section>
                    <div className="row">
                        {books.map(book => (
                            <div className="col-lg-3 col-md-3 mb-3" key={book.id}>
                                <div className="card h-100">
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
                                            <p>Remain: {book.remain}</p>
                                        </a>
                                        <button type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark"
                                            onClick={() => router.push(`/search/${book.id}`)}
                                        >
                                            Detail
                                        </button>
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
