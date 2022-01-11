import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import bookApi from 'api/bookApi';
import { parseCookies } from 'nookies'

const DeleteBook = ({ showModalDelete, handleCloseModalDelete, idBook, selectDocumentHandler }) => {
    const handleOnDelete = async () => {
        const jwt = parseCookies().jwt;
        await bookApi.deleteBook(idBook, jwt);
        handleCloseModalDelete(false)
        selectDocumentHandler();
    }
    return (
        <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete book?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You want delete book with id: {idBook}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleOnDelete}>
                    Delete
                </Button>
                <Button onClick={handleCloseModalDelete}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteBook
