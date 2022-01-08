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
            members: members,
            books: books,
            transactionDetails: []
        },
        onSubmit: async (values) => {
            const jwt = Cookies.get("jwt");
            setLoading(true);
            if (transaction) {
                await transactionApi.updateTransaction(values, fileImage, transaction.id, jwt);
            } else {
                await transactionApi.createTransaction(values, fileImage, jwt);
            }
            setLoading(false)
            router.replace("/manage/transactions");
        },
    });

    const hanldeAddBook = () => {
        formik.values.transactionDetails.push({ book: '', quantity: 0 });
        setOnChange(statePre => !statePre);
    }

    const handleRemoveBook = (index) => {
        let transactionDetails = formik.values.transactionDetails;
        formik.values.transactionDetails = []
        for (let i in transactionDetails) {
            console.log("index...", i != index)
            console.log("transaction detail...", transactionDetails[i])
            if (i != index) {
                console.log("da vao")
                formik.values.transactionDetails.push(transactionDetails[i]);
            }
        }
        console.log(formik.values.transactionDetails);
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

    //khi input file change thì gọi để show image preview
    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        setFileImage(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = e => {
            setSrcImage([reader.result])
        }
    }

    const srcImagePhoto = () => {
        if (srcImage) return srcImage;
        if (transaction?.photo) return `${BASE_URL}${transaction.photo.url}`;
        return "/image/thumbnail.png"
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
                                                <select name="category" onChange={formik.handleChange}
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
                                                <label className="form-label" for="form7Example2">Borrow date</label>
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
                                        formik.values.transactionDetails.map((transactionDetail, index) => (
                                            <div className="row mb-4" key={index}>
                                                <div className="col-6">
                                                    <div className="form-outline">
                                                        <label className="form-label">Book</label>
                                                        <select name="book" onChange={(event) => handleChangeSelect(event, index)}
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
                                                        <input type="number" name="pay_date" placeholder="Quantity"
                                                            value={transactionDetail[index]?.quantity}
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
