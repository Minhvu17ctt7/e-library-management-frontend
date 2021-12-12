import Footer from "component/Layout/Footer";
import Header from "component/Layout/Header";
import { Button, Card, Form } from "react-bootstrap";
import bookApi from "api/bookApi";

export default function Search({ books, page, totalPage }) {
    console.log(books)
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
                <div class="row row-cols-1 row-cols-md-3">
                    {/* {
                        <div class="col mb-4">
                            <div class="card mb-3">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="..." alt="..." />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">Card title</h5>
                                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } */}
                    {/* <div class="col mb-4">
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="..." alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-4">
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="..." alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-4">
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="..." alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                         */}
                </div>
            </main>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ query: { page = 1 } }) {
    //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
    const start = +page === 1 ? 0 : (+page - 1) * 4;
    const books = await bookApi.getBooks(start);
    //Tính tổng page
    const numberOfMovies = await bookApi.countBook();
    const totalPage = Math.floor(numberOfMovies / 3)

    return {
        props: {
            books: books,
            page: +page,
            totalPage
        }
    }
}