import bookApi from 'api/bookApi';
import FormBook from 'component/book/formBook';
import { Fragment, useEffect, useState } from 'react';
import Loading from 'component/Loading/Loading';

const CreateBook = () => {
    const [categories, setCategories] = useState();
    const [authors, setAuthors] = useState();
    const [providers, setProviders] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const categories = await bookApi.getCategories();
            const authors = await bookApi.getAuthors();
            const providers = await bookApi.getProviders();
            setCategories(categories);
            setProviders(providers);
            setAuthors(authors);
            setLoading(false)
        })()
    }, [])

    return (
        <Fragment>
            {loading && <Loading />}
            <FormBook categories={categories} authors={authors} providers={providers} />
        </Fragment>
    )
}

export default CreateBook
