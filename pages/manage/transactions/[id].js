import { BASE_URL } from 'api/axiosClients'
import transactionApi from 'api/transactionApi'
import bookApi from 'api/bookApi'
import Layout from 'component/Layout/Layout'
import Loading from 'component/Loading/Loading'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'

const TransactionDetail = () => {
    const router = useRouter();
    const [transaction, setTransaction] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            const id = router.query.id;
            const transaction = await transactionApi.getTransactionById(id);
            var transaction_detail = transaction.transaction_details;
            for (let detail of transaction_detail){
                var book_detail = await bookApi.getBookById(detail.book);
                detail.book_name = book_detail.name;
            }
            setTransaction(transaction)
            setLoading(false)
        })()
    }, [])
    return (
        <Fragment> {loading && <Loading />} <Layout>
            {transaction && <div className="container my-5">

                <section>

                    <div className="card rounded mb-4">

                        <div className="row">
                            <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Member</h3>
                            <p className="text-muted" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{transaction.member.name}</p>
                            <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Borrow Date</h3>
                            <p className="text-muted" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{transaction.borrow_date}</p>

                            <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Pay Date</h3>
                            <p className="text-muted" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{transaction.pay_date}</p>
                            <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Appointment Date</h3>
                            <p className="text-muted" data-mdb-toggle="animation"
                                    data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-up" data-mdb-animation-duration="1000">{transaction.appointment_date}</p>
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                        data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Book</h3>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                        data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">Amount</h3>
                            </div>
                            {(transaction.transaction_details).map(detail => (
                                <div key={detail.id} className="row">
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                                data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">{detail.book_name}</h3>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                                        <h3 className="font-weight-normal mb-3" data-mdb-toggle="animation"
                                                data-mdb-animation-start="onLoad" data-mdb-animation="slide-in-down" data-mdb-animation-duration="1000">{detail.quantity}</h3>
                                    </div>
                                </div>

                            ))}
                            
                            
                            
                        </div>

                    </div>

                </section>

            </div>}
        </Layout></Fragment>

    )
}

export default TransactionDetail
