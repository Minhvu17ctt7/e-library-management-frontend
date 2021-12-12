import React from 'react'
import Layout from 'component/Layout/Layout'
import { Row, Col } from 'react-bootstrap'
import bookApi from 'api/bookApi'
import { BASE_URL } from 'api/axiosClients'

const BookDetail = ({ book }) => {
    return (
        <Layout>
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
        </Layout>
    )
}

export default BookDetail

export async function getServerSideProps({ params }) {
    const book = await bookApi.getBookById(params.id);
    return {
        props: {
            book
        }
    }
}
