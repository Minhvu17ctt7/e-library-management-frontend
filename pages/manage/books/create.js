import bookApi from 'api/bookApi';
import FormBook from 'component/book/formBook';

const CreateBook = (props) => {

    return (
        <FormBook {...props} />
    )
}

export default CreateBook

export async function getStaticProps() {

    //Mấy cái này lấy để show cho user chọn
    const categories = await bookApi.getCategories();
    const authors = await bookApi.getAuthors();
    const providers = await bookApi.getProviders();
    return {
        props: {
            categories,
            authors,
            providers
        },
    }
}
