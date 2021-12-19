import React, { useState, useEffect } from 'react'
import FormBook from 'component/book/formBook'
import bookApi from 'api/bookApi'
import nookies from 'nookies'
import { useRouter } from 'next/router'

const UpdateBook = () => {
    const router = useRouter();
    const [categories, setCategories] = useState();
    const [authors, setAuthors] = useState();
    const [providers, setProviders] = useState();
    const [book, setBook] = useState();

    useEffect(() => {
        (async () => {
            const id = router.query.id;
            const categories = await bookApi.getCategories();
            const authors = await bookApi.getAuthors();
            const providers = await bookApi.getProviders();
            const book = await bookApi.getBookById(id);
            setCategories(categories);
            setProviders(providers);
            setAuthors(authors);
            setBook(book);
        })()
    }, [])
    return (
        <FormBook categories={categories} authors={authors} providers={providers} book={book} />
    )
}

export default UpdateBook
