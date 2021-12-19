import { BASE_URL } from 'api/axiosClients'
import bookApi from 'api/bookApi'
import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Loading from 'component/Loading/Loading';

const BookDetail = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState();
    useEffect(() => {
        (async () => {
            setLoading(true);
            const id = router.query.id;
            const book = await bookApi.getBookById(id);
            setBook(book)
            setLoading(false)
        })()
    }, [])

    return (
        <Fragment>
            {loading && <Loading />}
            <Header />
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

                                </ul>

                            </div>

                        </div>

                    </div>

                </section>

            </div>}
            <Footer />
        </Fragment>
    )
}

export default BookDetail

