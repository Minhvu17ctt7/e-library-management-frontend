import React from 'react'
import FormBook from 'component/book/formBook'
import bookApi from 'api/bookApi'
import nookies from 'nookies'

const UpdateBook = (props) => {
    return (
        <FormBook {...props} />
    )
}

export default UpdateBook

export async function getServerSideProps(context) {
    const jwt = nookies.get(context).jwt;
    const id = context.params.id;
    const book = await bookApi.getBookById(id, jwt);
    const categories = await bookApi.getCategories(jwt);
    const authors = await bookApi.getAuthors(jwt);
    const providers = await bookApi.getProviders(jwt);
    return {
        props: {
            book,
            categories,
            authors,
            providers
        }
    }
}
