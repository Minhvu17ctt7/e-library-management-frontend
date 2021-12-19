import bookApi from 'api/bookApi';
import FormBook from 'component/book/formBook';
import nookies from 'nookies'
import { useEffect, useState } from 'react';

const CreateBook = () => {
    const [categories, setCategories] = useState();
    const [authors, setAuthors] = useState();
    const [providers, setProviders] = useState();

    useEffect(() => {
        (async () => {
            const categories = await bookApi.getCategories();
            const authors = await bookApi.getAuthors();
            const providers = await bookApi.getProviders();
            setCategories(categories);
            setProviders(providers);
            setAuthors(authors);
        })()
    }, [])
    
    return (
        <FormBook categories={categories} authors={authors} providers={providers} />
    )
}

export default CreateBook
