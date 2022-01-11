import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import transactionApi from 'api/transactionApi';
import { parseCookies } from 'nookies'

const DeleteTransaction = ({ showModalDelete, handleCloseModalDelete, idTransaction, selectDocumentHandler }) => {
    const handleOnDelete = async () => {
        const jwt = parseCookies().jwt;
        await transactionApi.deleteTransaction(idTransaction, jwt);
        handleCloseModalDelete(false)
        selectDocumentHandler();
    }
    return (
        <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete transaction?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You want delete transaction with id: {idTransaction}</Modal.Body>
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

export default DeleteTransaction
