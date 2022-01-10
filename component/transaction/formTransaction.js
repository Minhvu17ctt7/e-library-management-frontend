import React, { Fragment, useState } from 'react'
import transactionApi from 'api/transactionApi'
import Layout from 'component/Layout/Layout'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { BASE_URL } from 'api/axiosClients'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import Loading from 'component/Loading/Loading'

const FormTransaction = ({ members, books, transaction }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    //Lưu src để hiện image preview khi chọn image
    const [srcImage, setSrcImage] = useState();
    //Lưu file để create
    const [fileImage, setFileImage] = useState();
    const [onChange, setOnChange] = useState(true);

    //Cái formik này để quản lý value input dễ hơn state
    const formik = useFormik({
        initialValues: {
            member: transaction?.member.id,
            pay_date: transaction?.pay_date,
            borrow_date: transaction?.borrow_date,
            appointment_date: transaction?.appointment_date,
            members: members,
            books: books,
            transactionDetails: transaction ? transaction.transaction_details : ''
        },
        onSubmit: async (values) => {
            const jwt = Cookies.get("jwt");
            setLoading(true);
            if (transaction) {
                await transactionApi.updateTransaction(values, fileImage, transaction.id, jwt);
                var idUpdate = [];
                for (let transaction_detail of values.transactionDetails) {
                    var data = {
                        book: transaction_detail.book,
                        quantity: transaction_detail.quantity,
                        transaction: transaction.id
                    }
                    if (typeof transaction_detail.id !== 'undefined') {
                        idUpdate.push(transaction_detail.id);
                        await transactionApi.updateTransactionDetail(data, fileImage, transaction_detail.id, jwt);
                    } else {
                        await transactionApi.createTransactionDetail(data, fileImage, jwt);

                    }
                }
                for (let transactionDetail of transaction.transaction_details) {
                    if (!idUpdate.includes(transactionDetail.id)) {
                        await transactionApi.deleteTransactionDetail(transactionDetail.id)
                    }
                }

            }
            else {
                var transactionCreate = await transactionApi.createTransaction(values, fileImage, jwt);

                for (let transaction_detail of values.transactionDetails) {
                    var data = {
                        book: transaction_detail.book,
                        quantity: transaction_detail.quantity,
                        transaction: transactionCreate.id
                    }
                    await transactionApi.createTransactionDetail(data, fileImage, jwt);
                }
            }
            setLoading(false)
            router.replace("/manage/transactions");
        },
    });

    const hanldeAddBook = () => {
        if (typeof formik.values.transactionDetail !== "undefined") {
            formik.values.transactionDetails.push({ book: '', quantity: '' });
        }
        else {
            formik.values.transactionDetails = [{ book: '', quantity: '' }];
        }

        setOnChange(statePre => !statePre);
    }

    const handleRemoveBook = (index) => {
        let transactionDetails = formik.values.transactionDetails;
        formik.values.transactionDetails = []
        for (let i in transactionDetails) {
            console.log("index...", i != index)
            console.log("transaction detail...", transactionDetails[i])
            if (i != index) {
                formik.values.transactionDetails.push(transactionDetails[i]);
            }
        }
        setOnChange(statePre => !statePre);
    }

    const handleChangeSelect = (event, index) => {
        formik.values.transactionDetails[index].book = event.target.value;
        setOnChange(statePre => !statePre);
    }

    const handleChangeQuantity = (event, index) => {
        formik.values.transactionDetails[index].quantity = event.target.value;
        setOnChange(statePre => !statePre);
    }
    return (
        <Fragment>
            {loading && <Loading />}
            <Layout>
                <h1 className="h3 pt-3 pb-2 mb-3 border-bottom">{
                    transaction ? `Update transaction id: ${transaction.id}` : 'Create transaction'
                }</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Infomation transaction</h5>
                                </div>
                                <div className="card-body">

                                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Name member</label>
                                                <select name="member" onChange={formik.handleChange}
                                                    defaultValue={formik.values.member}
                                                    className="form-control"
                                                >
                                                    <option>Choose member</option>
                                                    {
                                                        members?.map(member => (
                                                            <option key={member.id} value={member.id}>{member.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label">Borrow date</label>
                                                <input type="date" name="borrow_date" placeholder="borrow_date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.borrow_date}
                                                    className="form-control"
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="form-label">Pay date</label>
                                                <input type="date" name="pay_date" placeholder="pay_date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.pay_date}
                                                    className="form-control"
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-outline">
                                                <label className="form-label">Appointment date</label>
                                                <input type="date" name="appointment_date" placeholder="appointment_date"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.appointment_date}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Sách mượn</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <Button type="button" onClick={hanldeAddBook} className="btn btn-primary m-2" >
                                                Thêm sách
                                            </Button>
                                        </div>
                                    </div>
                                    {
                                        formik.values.transactionDetails && formik.values.transactionDetails.map((transactionDetail, index) => (

                                            <div className="row mb-4" key={index}>
                                                <input type="hidden" name="transaction_details.transaction" placeholder="Quantity"
                                                    value={transaction?.id}
                                                    onChange={(event) => handleChangeQuantity(event, index)}
                                                    className="form-control"
                                                    required />
                                                <div className="col-6">
                                                    <div className="form-outline">
                                                        <label className="form-label">Book</label>
                                                        <select name="transaction_details.book" onChange={(event) => handleChangeSelect(event, index)}
                                                            value={transactionDetail.book}
                                                            className="form-control"
                                                        >
                                                            <option>Choose book</option>
                                                            {
                                                                books?.map(book => (
                                                                    <option key={book.id} value={book.id}>{book.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-outline">
                                                        <label className="form-label">Quantity</label>
                                                        <input type="number" name="transaction_details.quantity" placeholder="Quantity"
                                                            value={transactionDetail?.quantity}
                                                            onChange={(event) => handleChangeQuantity(event, index)}
                                                            className="form-control"
                                                            required />
                                                    </div>
                                                </div>
                                                <div className="col-2" style={{ display: "flex", alignItems: "flex-end" }}>
                                                    <i className="bi bi-x-circle" style={{ fontSize: "30px" }} onClick={() => handleRemoveBook(index)}></i>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4 text-center">
                            <Button type="submit" className="btn btn-primary m-2" disabled={loading}>
                                {transaction ? "Update" : "Create"}
                            </Button>
                            <button type="button" className="btn btn-secondary m-2" onClick={() => router.push("/manage/transactions")}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Layout>
        </Fragment >
    )
}

export default FormTransaction
