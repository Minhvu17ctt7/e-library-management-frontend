import React from 'react'
import FormBook from 'component/book/formBook'
import bookApi from 'api/bookApi'

const UpdateBook = (props) => {
    return (
        <FormBook {...props} />
    )
}

export default UpdateBook

export async function getServerSideProps({ params }) {
    const book = await bookApi.getBookById(params.id);
    const categories = await bookApi.getCategories();
    const authors = await bookApi.getAuthors();
    const providers = await bookApi.getProviders();
    return {
        props: {
            book,
            categories,
            authors,
            providers
        }
    }
}
