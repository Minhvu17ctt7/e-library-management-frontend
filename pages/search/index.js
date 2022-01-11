import { BASE_URL } from "api/axiosClients";
import bookApi from "api/bookApi";
import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import Loading from "component/Loading/Loading";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NoData from "component/NoData";

export default function Search() {
    const limit = 8;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState();
    const [valueInputSearch, setValueInputSearch] = useState('');
    let page = +router.query.page || 1;
    let keySearch = router.query.keySearch || '';
    const [totalPage, setTotalPage] = useState();
    const start = page === 1 ? 0 : (page - 1) * limit;
    const didMount = useRef(false);


    useEffect(() => {
        (async () => {
            setLoading(true);
            //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
            const books = await bookApi.getBooks({ "_start": start, "name_contains": keySearch }, limit);
            setBooks(books)
            //Tính tổng page
            const numberOfBooks = await bookApi.countBook2({ "name_contains": keySearch });

            const totalPage = Math.ceil(numberOfBooks / limit)
            setTotalPage(totalPage)
            setLoading(false)
        })()
    }, [page, keySearch])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search?page=1&keySearch=${valueInputSearch}`);
    }

    const handleChangeSearch = (event) => {
        setValueInputSearch(event.target.value);
    };

    //hanlde click item pagination
    const handleClickPagination = (pageNext) => {
        if (pageNext > totalPage || pageNext < 1) {
            return;
        }
        router.push(`/search?page=${pageNext}&keySearch=${keySearch}`);
    }


    //Hiện item pagination
    const itemPagination = () => {

        let list = [];
        for (let i = 0; i < totalPage; i++) {
            list.push(<li key={i} className={page === (i + 1) ? "page-item active" : "page-item"} onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
        }
        return list;
    }

    return (
        <>
            {loading && <Loading />}
            <Header />
            <main style={{ minHeight: '95vh', marginTop: '80px' }}>
                <Form className="d-inline" onSubmit={handleSearch}>
                    <Form.Group className="w-25 mx-5 my-3">
                        <Form.Label style={{ opacity: '0.9' }}>Tra cứu sách</Form.Label>
                        <div style={{ display: 'flex' }}>
                            <Form.Control type="text" placeholder="Nhập tên sách" onChange={handleChangeSearch} />
                            <Button className="mx-2" variant="primary" type="submit">
                                Search
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
                {books && books.length <= 0 && !loading && <NoData />}
                {books && <section>
                    <div className="row p-3">
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
                                    <div className="card-body d-flex flex-column justify-content-end">
                                        <h5 className="card-title mb-3">{book.name}</h5>
                                        <p>Remain: {book.remain}</p>
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
                {!!books?.length && (
                    <nav aria-label="Page navigation" className="d-flex justify-content-center">
                        <ul className="pagination">
                            <li className={page <= 1 ? 'page-item disabled' : 'page-item'}
                                onClick={() => handleClickPagination(page - 1)}
                            >
                                <a className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {
                                itemPagination()
                            }
                            <li className={page >= totalPage ? 'page-item disabled' : 'page-item'}
                                onClick={() => handleClickPagination(page + 1)}
                            >
                                <a className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>)}
            </main>
            <Footer />
        </>
    );
}
