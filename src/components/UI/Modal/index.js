import React from 'react'
import { Col, Container, Row, Button, Modal  } from 'react-bootstrap'

/**
* @author
* @function Modal
**/

const NewModal = (props) => {
  return(
        <Modal 
            show={props.show} 
            handleClose={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               { props.children } 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
   )
}

export default NewModal