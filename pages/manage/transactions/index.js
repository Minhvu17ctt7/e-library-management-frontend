import { BASE_URL } from 'api/axiosClients'
import transactionApi from 'api/transactionApi'
import Layout from 'component/Layout/Layout'
import Loading from 'component/Loading/Loading'
import ModalDeleteTransaction from 'component/modal/DeleteTransaction'
import ModalNotify from 'component/modal/NotifyModal'
import TransactionSearchForm from 'component/transaction/transactionSearchForm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import NoData from 'component/NoData'

const initFilterState = {
    'name_contains': null,
    'author.name_contains': null,
    'category.id': null
};

const Transactions = () => {
    const router = useRouter();
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalNotify, setShowModalNotify] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState();
    const [transactions, setTransactions] = useState();
    const page = +router.query.page || 1;
    const [totalPage, setTotalPage] = useState();
    const [loading, setLoading] = useState(false)
    const [hasOnChange, setHasOnChange] = useState(false);
    const [filter, setFilter] = useState(initFilterState);
    const start = page === 1 ? 0 : (page - 1) * 4;

    const selectDocumentHandler = () => {
        setHasOnChange(preState => !preState);
    };
    useEffect(() => {
        handleClickPagination(1);
    }, [filter]);
    useEffect(() => {
        (async () => {
            setLoading(true);
            //Lấy sách theo page, vì strapi version 3. chưa hỗ trợ pagination nên phải làm theo cách start, limit
            const transactions = await transactionApi.getTransactions({ "_start": start, _sort: 'id:ASC', ...filter });
            setTransactions(transactions)
            //Tính tổng page
            const numberOfTransactions = await transactionApi.countTransaction(filter);
            const totalPage = Math.ceil(numberOfTransactions / 4)
            setTotalPage(totalPage)
            setLoading(false)
        })()
    }, [page, hasOnChange, filter])

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

    //handle click button delete transaction
    const handleDeleteTransaction = (id) => {
        setCurrentTransaction(id);
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
        router.push(`/manage/transactions?page=${pageNext}`);
    }

    //kiểm tra xem sách có thuộc phiếu mượn nào không
    const checkIsDelete = (id) => {
        return transactions.find(transaction => id === transaction.id).transaction_details.length > 0;
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
        <Fragment>
            {loading && <Loading />}
            <Layout>
                <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">Transactions</h1>
                <div className="d-flex justify-content-end mb-3">
                    <Link href="/manage/transactions/create">
                        <Button className="btn btn-primary">Create transaction</Button>
                    </Link>
                </div>
                <TransactionSearchForm
                    setSearchFilter={setFilter}
                />
                {transactions && transactions.length <= 0 && !loading && <NoData />}
                {transactions && !!transactions.length && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Member</th>
                                <th scope="col">Borrowed date</th>
                                <th scope="col">Pay date</th>
                                <th scope="col">Transaction appointment date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} onClick={() => router.push(`/manage/transactions/${transaction.id}`)} style={{ cursor: 'pointer' }}>
                                    <th scope="row">{transaction.id}</th>
                                    <th scope="row">
                                        {transaction.member.name}
                                    </th>
                                    <td>{transaction.borrow_date}</td>
                                    <td>{transaction.pay_date}</td>
                                    <td>{transaction.appointment_date}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <Link href={`/manage/transactions/update/${transaction.id}`}>
                                            <button type="button" className="btn btn-sm px-3 btn-warning">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-sm px-3 m-2" onClick={() => handleDeleteTransaction(transaction.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button></td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>)}
                {transactions && (
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
                <ModalDeleteTransaction
                    showModalDelete={showModalDelete}
                    handleCloseModalDelete={handleCloseModalDelete}
                    idTransaction={currentTransaction}
                    selectDocumentHandler={selectDocumentHandler}
                />
                <ModalNotify
                    showModal={showModalNotify}
                    closeModal={handleCloseModalNotify}
                    content={{
                        title: "Can't delete transaction",
                        message: `Transaction id: ${currentTransaction} has transaction.
                     Please delete transaction before`
                    }}
                />
            </Layout >
        </Fragment >
    )
}

export default Transactions
