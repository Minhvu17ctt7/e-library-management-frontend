import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteBook = ({ showModalDelete, handleCloseModalDelete, idBook }) => {
    const handleOnDelete = async () => {
        await bookApi.deleteBook(idBook);
        setShowModalDelete(false)
    }
    return (
        <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete book?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You want delete book width id: {idBook}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleOnDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleCloseModalDelete}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteBook
