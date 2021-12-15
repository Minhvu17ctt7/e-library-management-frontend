import bookApi from 'api/bookApi';
import FormBook from 'component/book/formBook';
import nookies from 'nookies'

const CreateBook = (props) => {

    return (
        <FormBook {...props} />
    )
}

export default CreateBook

export async function getServerSideProps(context) {
    const jwt = nookies.get(context).jwt;
    //Mấy cái này lấy để show cho user chọn
    const categories = await bookApi.getCategories(jwt);
    const authors = await bookApi.getAuthors(jwt);
    const providers = await bookApi.getProviders(jwt);
    return {
        props: {
            categories,
            authors,
            providers
        },
    }
}
