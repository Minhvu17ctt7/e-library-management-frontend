import React from 'react'
import { useRouter } from 'next/router'
import bookApi from '../../../api/bookApi'
import Layout from '../../../component/Layout/Layout'

const Books = ({ books, page, totalPage }) => {
    const router = useRouter();

    const handleClickPagination = (pageNext) => {
        if (pageNext > totalPage || pageNext < 1) {
            return;
        }
        router.push(`/admin/books?page=${pageNext}`);
    }

    const itemPagination = () => {
        let list = [];
        for (let i = 0; i < totalPage; i++) {
            list.push(<li className="page-item" onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
        }
        return list;
    }

    return (
        <Layout>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">Books</h1>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Remain</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <th scope="row">{book.id}</th>
                            <td>{book.name}</td>
                            <td>{book.author.name}</td>
                            <td>{book.remain}</td>
                            <td><i class="bi bi-trash"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
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
            </nav>
        </Layout >
    )
}

export default Books

export async function getServerSideProps({ query: { page = 1 } }) {
    const start = +page === 1 ? 0 : (+page - 1) * 4;

    const resBooks = await bookApi.getBooks(start);
    const resNumberOfMovies = await bookApi.countBook();
    const totalPage = Math.floor(resNumberOfMovies.data / 3)

    return {
        props: {
            books: resBooks.data,
            page: +page,
            totalPage
        }
    }
}