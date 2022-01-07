import transactionApi from 'api/transactionApi'
import FormTransaction from 'component/transaction/formTransaction'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Loading from 'component/Loading/Loading'

const UpdateTransaction = () => {
    const router = useRouter();
    const [categories, setCategories] = useState();
    const [authors, setAuthors] = useState();
    const [providers, setProviders] = useState();
    const [transaction, setTransaction] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id = router.query.id;
            const categories = await transactionApi.getCategories();
            const authors = await transactionApi.getAuthors();
            const providers = await transactionApi.getProviders();
            const transaction = await transactionApi.getTransactionById(id);
            setCategories(categories);
            setProviders(providers);
            setAuthors(authors);
            setTransaction(transaction);
            setLoading(false)
        })()
    }, [])
    return (
        <Fragment>
            {loading && <Loading />}
            {transaction && <FormTransaction categories={categories} authors={authors} providers={providers} transaction={transaction} />}
        </Fragment>
    )
}

export default UpdateTransaction
