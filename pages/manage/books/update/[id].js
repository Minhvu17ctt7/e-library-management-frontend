import bookApi from 'api/bookApi'
import FormBook from 'component/book/formBook'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Loading from 'component/Loading/Loading'

const UpdateBook = () => {
    const router = useRouter();
    const [categories, setCategories] = useState();
    const [authors, setAuthors] = useState();
    const [providers, setProviders] = useState();
    const [book, setBook] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id = router.query.id;
            const categories = await bookApi.getCategories();
            const authors = await bookApi.getAuthors();
            const providers = await bookApi.getProviders();
            const book = await bookApi.getBookById(id);
            setCategories(categories);
            setProviders(providers);
            setAuthors(authors);
            setBook(book);
            setLoading(false)
        })()
    }, [])
    return (
        <Fragment>
            {loading && <Loading />}
            {book && <FormBook categories={categories} authors={authors} providers={providers} book={book} />}
        </Fragment>
    )
}

export default UpdateBook
