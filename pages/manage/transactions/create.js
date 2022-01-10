import transactionApi from 'api/transactionApi';
import FormTransaction from 'component/transaction/formTransaction';
import { Fragment, useEffect, useState } from 'react';
import Loading from 'component/Loading/Loading';

const CreateTransaction = () => {
    const [members, setMembers] = useState();
    const [books, setBooks] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const members = await transactionApi.getMembers();
            const books = await transactionApi.getBooks();
            setMembers(members);
            setBooks(books);
            setLoading(false)
        })()
    }, [])

    return (
        <Fragment>
            {loading && <Loading />}
            <FormTransaction members={members} books={books} />
        </Fragment>
    )
}

export default CreateTransaction
