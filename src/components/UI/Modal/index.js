import React from 'react'
import { Col, Container, Row, Button, Modal  } from 'react-bootstrap'

/**
* @author
* @function Modal
**/

const NewModal = (props) => {
  return(
        <Modal 
            size={props.size}
            show={props.show} 
            onHide={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               { props.children } 
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((btn, index) => {
                        return  (
                            <Button 
                                key={index} 
                                variant={btn.color} 
                                onClick={btn.onClick}
                            >
                                {btn.label}
                            </Button>
                        )
                    }) :  
                        <Button 
                            variant="primary" 
                            className="btn-sm"
                            style={{ backgroundColor: '#333' }} 
                            onClick={props.onSubmit} 
                            {...props}
                        >
                            Save
                        </Button>
                }
               
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal