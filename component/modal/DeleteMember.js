import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import memberApi from 'api/memberApi';
import { parseCookies } from 'nookies'

const DeleteMember = ({ showModalDelete, handleCloseModalDelete, idMember }) => {
    const handleOnDelete = async () => {
        const jwt = parseCookies().jwt;
        await memberApi.deleteMember(idMember, jwt);
        handleCloseModalDelete(false)
    }
    return (
        <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete member?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You want delete member with id: {idMember}</Modal.Body>
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

export default DeleteMember
