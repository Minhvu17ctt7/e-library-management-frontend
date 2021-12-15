import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Modal, Button } from 'react-bootstrap'
import bookApi from 'api/bookApi'
import Layout from 'component/Layout/Layout'
import ModalDeleteBook from 'component/modal/DeleteBook'
import ModalNotify from 'component/modal/NotifyModal'
import nookies from 'nookies'

const Books = ({ books, page, totalPage, jwt2 }) => {
    const router = useRouter();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalNotify, setShowModalNotify] = useState(false);
    const [currentBook, setCurrentBook] = useState();

    //handle open và close modal hỏi xem có muốn xóa sách hay k
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => {
        setShowModalDelete(true);
    }

    //hanlde open và close thông báo không thể xóa sách
    const handleCloseModalNotify = () => setShowModalNotify(false);
    const handleShowModalNotify = () => {
        setShowModalNotify(true);
    }

    //handle click button delete book
    const handleDeleteBook = (id) => {
        setCurrentBook(id);
        //Nếu sách chưa có ai mượn thì cho xóa, ngược lại thì thông báo không đc xóa
        if (!checkIsDelete(id)) {
            handleShowModalDelete();
        } else { handleShowModalNotify(); }

    }

    //hanlde click item pagination
    const handleClickPagination = (pageNext) => {
        if (pageNext > totalPage || pageNext < 1) {
            return;
        }
        router.push(`/manage/books?page=${pageNext}`);
    }

    //kiểm tra xem sách có thuộc phiếu mượn nào không
    const checkIsDelete = (id) => {
        return books.find(book => id === book.id).transaction_details.length > 0;
    }

    //Hiện item pagination 
    const itemPagination = () => {
        let list = [];
        for (let i = 0; i < totalPage; i++) {
            list.push(<li key={i} className="page-item" onClick={() => handleClickPagination(i + 1)}><a className="page-link">{i + 1}</a></li>)
        }
        return list;
    }

    return (
        <Layout>
            <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">Books</h1>
            <Link href="/manage/books/create">
                <Button className="btn btn-primary">Create book</Button>
            </Link>
            {books && (<table className="table">
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
                        <tr key={book.id} onClick={() => router.push(`/manage/books/${book.id}`)}>
                            <th scope="row">{book.id}</th>
                            <td>{book.name}</td>
                            <td>{book.author.name}</td>
                            <td>{book.remain}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <Link href={`/manage/books/update/${book.id}`}>
                                    <i className="bi bi-pencil-square"></i>
                                </Link>
                                <i className="bi bi-trash" onClick={() => handleDeleteBook(book.id)}></i></td>

                        </tr>
                    ))}
                </tbody>
            </table>)}
            {books && (<nav aria-label="Page navigation example">
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
            <ModalDeleteBook
                showModalDelete={showModalDelete}
                handleCloseModalDelete={handleCloseModalDelete}
                idBook={currentBook}
            />
            <ModalNotify
                showModal={showModalNotify}
                closeModal={handleCloseModalNotify}
                content={{
                    title: "Can't delete book",
                    message: `Book id: ${currentBook} has transaction.
                     Please delete transaction before`
                }}
            />
        </Layout >
    )
}

export default Books

export async function getServerSideProps(context) {
    const jwt = nookies.get(context).jwt;
    const page = context.query.page || 1;
    //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
    const start = +page === 1 ? 0 : (+page - 1) * 4;
    const books = await bookApi.getBooks(start, jwt);
    //Tính tổng page
    const numberOfMovies = await bookApi.countBook(jwt);
    const totalPage = Math.floor(numberOfMovies / 3)

    return {
        props: {
            books: books,
            page: +page,
            totalPage,
        }
    }
}