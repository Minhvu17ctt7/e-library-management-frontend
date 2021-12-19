import React, { Fragment, useEffect, useState } from 'react'
import Layout from 'component/Layout/Layout'
import { Row, Col } from 'react-bootstrap'
import bookApi from 'api/bookApi'
import { BASE_URL } from 'api/axiosClients'
import nookies from 'nookies'
import { useRouter } from 'next/router'

const BookDetail = () => {
    const router = useRouter();
    const [book, setBook] = useState();
    useEffect(() => {
        (async () => {
            const id = router.query.id;
            const book = await bookApi.getBookById(id);
            setBook(book)
        })()
    }, [])

    return (
        <Layout>
            {book && <div className="container my-5">

                <section>

                    <div className="card rounded mb-4">

                        <div className="row">

                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <img className="img-fluid rounded rounded-left" src={book.photo ? `${BASE_URL}${book.photo.url}` : "/image/thumbnail.png"} alt="project image" />
                            </div>

                            <div className="col-md-6 p-5 align-self-center">

                                <h3 className="font-weight-normal mb-5 text-center" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">{book.name}</h3>

                                <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Book description</h3>
                                <p className="text-muted" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.description}</p>

                                <ul className="list-unstyled font-small mt-5 mb-0">
                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Author</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.author.name}.</p>
                                    </li>

                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Category</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.category.name}.</p>
                                    </li>
                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Provider</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.provider.name}.</p>
                                    </li>
                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Page</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.page} trang</p>
                                    </li>
                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Price</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.price} VND</p>
                                    </li>
                                    <li>
                                        <p className="text-uppercase mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Remain</strong></p>
                                        <p className="text-muted mb-4" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{book.remain} cuốn</p>
                                    </li>

                                    {/* <li>
                                        <p className="text-uppercase mt-4 mb-2" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000"><strong>Share</strong></p>
                                        <div className="d-flex justify-content-start" data-mdb-toggle="animation"
                                            data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">
                                            <a className="text-muted pe-3" href="#"><i className="fab fa-facebook-f"></i></a>
                                            <a className="text-muted pe-3" href="#"><i className="fab fa-twitter"></i></a>
                                            <a className="text-muted pe-3" href="#"><i className="fab fa-instagram"></i></a>
                                            <a className="text-muted" href="#"><i className="fab fa-dribbble"></i></a>
                                        </div>
                                    </li> */}

                                </ul>

                            </div>

                        </div>

                    </div>

                </section>

            </div>}
            {/* {book && (<Fragment>
                <h1 className="h3 pb-2 mb-3 border-bottom">Book id: {book.id}</h1>
                <Row>

                </Row>
                <Row className="mb-3 pb-3">
                    <Col sm={5}>
                        <img src={book.photo ? `${BASE_URL}${book.photo.url}` : "/image/thumbnail.png"} alt="photo-book" style={{ width: '90%' }} />
                    </Col>
                    <Col sm={7}>
                        <h4 className="mb-3">{book.name}</h4>
                        <br />
                        <p className="mb-3">Author: {book.author.name}</p>
                        <br />
                        <p className="mb-3">Category: {book.category.name}</p>
                        <br />
                        <p className="mb-3">provpder: {book.provider.name}</p>
                        <br />
                        <p className="mb-3">Page: {book.page}</p>
                        <br />
                        <p className="mb-3">Price: {book.price}đ</p>
                        <br />
                        <p className="mb-3">Remain: {book.remain}</p>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <h4 clasName="mb-3">Description</h4>
                        <i>{book.description}</i>
                    </Col>
                </Row>
            </Fragment>)} */}
        </Layout>
    )
}

export default BookDetail
