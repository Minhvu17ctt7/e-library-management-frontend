import transactionApi from 'api/transactionApi'
import bookApi from 'api/bookApi'
import FormTransaction from 'component/transaction/formTransaction'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Loading from 'component/Loading/Loading'

const UpdateTransaction = () => {
    const router = useRouter();
    const [members, setMembers] = useState();
    const [transaction, setTransaction] = useState();
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            const id = router.query.id;
            const transaction = await transactionApi.getTransactionById(id);
            const members = await transactionApi.getMembers();
            const books = await transactionApi.getBooks();
            setMembers(members);
            setBooks(books);
            setTransaction(transaction)
            setLoading(false)
        })()
    }, [])

    return (
        <Fragment>
            {loading && <Loading />}
            {transaction && <FormTransaction members={members} books={books} transaction={transaction} />}
        </Fragment>
    )
}

export default UpdateTransaction
