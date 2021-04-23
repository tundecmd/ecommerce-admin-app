import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button,  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions/category.action'
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input'

/**
* @author
* @function Category
**/

const Category = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => {

        const form = new FormData();
        form.append(`name`, categoryName)
        form.append(`parentId`, parentCategoryId)
        form.append(`categoryImage`, categoryImage)
        dispatch(addCategory(form));
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }
        //console.log(`cat`, cat)
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");

    const category = useSelector(state => state.category);
    const dispatch = useDispatch()
        useEffect(() => {
            dispatch(getAllCategory())
    }, [])

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {
                        category.children.length > 0 
                            ?   (<ul>{renderCategories(category.children)}</ul>)
                            :   null
                    }
                </li>
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options=[]) => {
        for (const category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = e => {
        setCategoryImage(e.target.files[0])
    }

  return(
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12} className="d-flex justify-content-between">
                    <h3>Category</h3>
                    <button onClick={handleShow}>Add</button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ul>
                        { renderCategories(category.categories) }
                        
                    </ul>
                </Col>
            </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select className="form-control" value={parentCategoryId} onChange={e => setParentCategoryId(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(category.categories).map(option => 
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Layout>
   )
}

export default Category