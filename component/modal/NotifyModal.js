import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const NotifyModal = ({ showModal, closeModal, content }) => {
    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{content.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NotifyModal
